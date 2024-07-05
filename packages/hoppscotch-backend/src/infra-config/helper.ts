import { AuthProvider } from 'src/auth/helper';
import {
  AUTH_PROVIDER_NOT_CONFIGURED,
  DATABASE_TABLE_NOT_EXIST,
} from 'src/errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { InfraConfigEnum } from 'src/types/InfraConfig';
import { throwErr } from 'src/utils';
import { randomBytes } from 'crypto';

export enum ServiceStatus {
  ENABLE = 'ENABLE',
  DISABLE = 'DISABLE',
}

const AuthProviderConfigurations = {
  [AuthProvider.GOOGLE]: [
    InfraConfigEnum.GOOGLE_CLIENT_ID,
    InfraConfigEnum.GOOGLE_CLIENT_SECRET,
    InfraConfigEnum.GOOGLE_CALLBACK_URL,
    InfraConfigEnum.GOOGLE_SCOPE,
  ],
  [AuthProvider.GITHUB]: [
    InfraConfigEnum.GITHUB_CLIENT_ID,
    InfraConfigEnum.GITHUB_CLIENT_SECRET,
    InfraConfigEnum.GITHUB_CALLBACK_URL,
    InfraConfigEnum.GITHUB_SCOPE,
  ],
  [AuthProvider.MICROSOFT]: [
    InfraConfigEnum.MICROSOFT_CLIENT_ID,
    InfraConfigEnum.MICROSOFT_CLIENT_SECRET,
    InfraConfigEnum.MICROSOFT_CALLBACK_URL,
    InfraConfigEnum.MICROSOFT_SCOPE,
    InfraConfigEnum.MICROSOFT_TENANT,
  ],
  [AuthProvider.EMAIL]: !!process.env.MAILER_USE_CUSTOM_CONFIGS
    ? [
        InfraConfigEnum.MAILER_SMTP_HOST,
        InfraConfigEnum.MAILER_SMTP_PORT,
        InfraConfigEnum.MAILER_SMTP_SECURE,
        InfraConfigEnum.MAILER_SMTP_USER,
        InfraConfigEnum.MAILER_SMTP_PASSWORD,
        InfraConfigEnum.MAILER_TLS_REJECT_UNAUTHORIZED,
        InfraConfigEnum.MAILER_ADDRESS_FROM,
      ]
    : [InfraConfigEnum.MAILER_SMTP_URL, InfraConfigEnum.MAILER_ADDRESS_FROM],
};

/**
 * Load environment variables from the database and set them in the process
 *
 * @Description Fetch the 'infra_config' table from the database and return it as an object
 * (ConfigModule will set the environment variables in the process)
 */
export async function loadInfraConfiguration() {
  try {
    const prisma = new PrismaService();

    const infraConfigs = await prisma.infraConfig.findMany();

    let environmentObject: Record<string, any> = {};
    infraConfigs.forEach((infraConfig) => {
      environmentObject[infraConfig.name] = infraConfig.value;
    });

    return { INFRA: environmentObject };
  } catch (error) {
    // Prisma throw error if 'Can't reach at database server' OR 'Table does not exist'
    // Reason for not throwing error is, we want successful build during 'postinstall' and generate dist files
    return { INFRA: {} };
  }
}

/**
 * Read the default values from .env file and return them as an array
 * @returns Array of default infra configs
 */
export async function getDefaultInfraConfigs(): Promise<
  { name: InfraConfigEnum; value: string }[]
> {
  const prisma = new PrismaService();

  // Prepare rows for 'infra_config' table with default values (from .env) for each 'name'
  const infraConfigDefaultObjs: { name: InfraConfigEnum; value: string }[] = [
    {
      name: InfraConfigEnum.MAILER_SMTP_ENABLE,
      value: process.env.MAILER_SMTP_ENABLE ?? 'true',
    },
    {
      name: InfraConfigEnum.MAILER_USE_CUSTOM_CONFIGS,
      value: process.env.MAILER_USE_CUSTOM_CONFIGS ?? 'false',
    },
    {
      name: InfraConfigEnum.MAILER_SMTP_URL,
      value: process.env.MAILER_SMTP_URL,
    },
    {
      name: InfraConfigEnum.MAILER_ADDRESS_FROM,
      value: process.env.MAILER_ADDRESS_FROM,
    },
    {
      name: InfraConfigEnum.MAILER_SMTP_HOST,
      value: process.env.MAILER_SMTP_HOST,
    },
    {
      name: InfraConfigEnum.MAILER_SMTP_PORT,
      value: process.env.MAILER_SMTP_PORT,
    },
    {
      name: InfraConfigEnum.MAILER_SMTP_SECURE,
      value: process.env.MAILER_SMTP_SECURE,
    },
    {
      name: InfraConfigEnum.MAILER_SMTP_USER,
      value: process.env.MAILER_SMTP_USER,
    },
    {
      name: InfraConfigEnum.MAILER_SMTP_PASSWORD,
      value: process.env.MAILER_SMTP_PASSWORD,
    },
    {
      name: InfraConfigEnum.MAILER_TLS_REJECT_UNAUTHORIZED,
      value: process.env.MAILER_TLS_REJECT_UNAUTHORIZED,
    },
    {
      name: InfraConfigEnum.GOOGLE_CLIENT_ID,
      value: process.env.GOOGLE_CLIENT_ID,
    },
    {
      name: InfraConfigEnum.GOOGLE_CLIENT_SECRET,
      value: process.env.GOOGLE_CLIENT_SECRET,
    },
    {
      name: InfraConfigEnum.GOOGLE_CALLBACK_URL,
      value: process.env.GOOGLE_CALLBACK_URL,
    },
    {
      name: InfraConfigEnum.GOOGLE_SCOPE,
      value: process.env.GOOGLE_SCOPE,
    },
    {
      name: InfraConfigEnum.GITHUB_CLIENT_ID,
      value: process.env.GITHUB_CLIENT_ID,
    },
    {
      name: InfraConfigEnum.GITHUB_CLIENT_SECRET,
      value: process.env.GITHUB_CLIENT_SECRET,
    },
    {
      name: InfraConfigEnum.GITHUB_CALLBACK_URL,
      value: process.env.GITHUB_CALLBACK_URL,
    },
    {
      name: InfraConfigEnum.GITHUB_SCOPE,
      value: process.env.GITHUB_SCOPE,
    },
    {
      name: InfraConfigEnum.MICROSOFT_CLIENT_ID,
      value: process.env.MICROSOFT_CLIENT_ID,
    },
    {
      name: InfraConfigEnum.MICROSOFT_CLIENT_SECRET,
      value: process.env.MICROSOFT_CLIENT_SECRET,
    },
    {
      name: InfraConfigEnum.MICROSOFT_CALLBACK_URL,
      value: process.env.MICROSOFT_CALLBACK_URL,
    },
    {
      name: InfraConfigEnum.MICROSOFT_SCOPE,
      value: process.env.MICROSOFT_SCOPE,
    },
    {
      name: InfraConfigEnum.MICROSOFT_TENANT,
      value: process.env.MICROSOFT_TENANT,
    },
    {
      name: InfraConfigEnum.VITE_ALLOWED_AUTH_PROVIDERS,
      value: getConfiguredSSOProviders(),
    },
    {
      name: InfraConfigEnum.ALLOW_ANALYTICS_COLLECTION,
      value: false.toString(),
    },
    {
      name: InfraConfigEnum.ANALYTICS_USER_ID,
      value: generateAnalyticsUserId(),
    },
    {
      name: InfraConfigEnum.IS_FIRST_TIME_INFRA_SETUP,
      value: (await prisma.infraConfig.count()) === 0 ? 'true' : 'false',
    },
  ];

  return infraConfigDefaultObjs;
}

/**
 * Get the missing entries in the 'infra_config' table
 * @returns Array of InfraConfig
 */
export async function getMissingInfraConfigEntries() {
  const prisma = new PrismaService();
  const [dbInfraConfigs, infraConfigDefaultObjs] = await Promise.all([
    prisma.infraConfig.findMany(),
    getDefaultInfraConfigs(),
  ]);

  const missingEntries = infraConfigDefaultObjs.filter(
    (config) =>
      !dbInfraConfigs.some((dbConfig) => dbConfig.name === config.name),
  );

  return missingEntries;
}

/**
 * Verify if 'infra_config' table is loaded with all entries
 * @returns boolean
 */
export async function isInfraConfigTablePopulated(): Promise<boolean> {
  const prisma = new PrismaService();
  try {
    const propsRemainingToInsert = await getMissingInfraConfigEntries();

    if (propsRemainingToInsert.length > 0) {
      console.log(
        'Infra Config table is not populated with all entries. Populating now...',
      );
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Stop the app after 5 seconds
 * (Docker will re-start the app)
 */
export function stopApp() {
  console.log('Stopping app in 5 seconds...');

  setTimeout(() => {
    console.log('Stopping app now...');
    process.kill(process.pid, 'SIGTERM');
  }, 5000);
}

/**
 * Get the configured SSO providers
 * @returns Array of configured SSO providers
 */
export function getConfiguredSSOProviders() {
  const allowedAuthProviders: string[] =
    process.env.VITE_ALLOWED_AUTH_PROVIDERS.split(',');
  let configuredAuthProviders: string[] = [];

  const addProviderIfConfigured = (provider) => {
    const configParameters: string[] = AuthProviderConfigurations[provider];

    const isConfigured = configParameters.every((configParameter) => {
      return process.env[configParameter];
    });

    if (isConfigured) configuredAuthProviders.push(provider);
  };

  allowedAuthProviders.forEach((provider) => addProviderIfConfigured(provider));

  if (configuredAuthProviders.length === 0) {
    throwErr(AUTH_PROVIDER_NOT_CONFIGURED);
  } else if (allowedAuthProviders.length !== configuredAuthProviders.length) {
    const unConfiguredAuthProviders = allowedAuthProviders.filter(
      (provider) => {
        return !configuredAuthProviders.includes(provider);
      },
    );
    console.log(
      `${unConfiguredAuthProviders.join(
        ',',
      )} SSO auth provider(s) are not configured properly. Do configure them from Admin Dashboard.`,
    );
  }

  return configuredAuthProviders.join(',');
}

/**
 * Generate a hashed valued for analytics
 * @returns Generated hashed value
 */
export function generateAnalyticsUserId() {
  const hashedUserID = randomBytes(20).toString('hex');
  return hashedUserID;
}
