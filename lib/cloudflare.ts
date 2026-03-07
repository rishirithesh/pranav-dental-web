import { S3Client } from '@aws-sdk/client-s3';

const accountId = process.env.R2_ACCOUNT_ID || 'placeholder_account_id';
const accessKeyId = process.env.R2_ACCESS_KEY_ID || 'placeholder';
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY || 'placeholder';

export const r2Client = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});
