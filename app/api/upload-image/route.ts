import { NextRequest, NextResponse } from 'next/server';
import { r2Client } from '@/lib/cloudflare';
import { PutObjectCommand } from '@aws-sdk/client-s3';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'File is required.' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const contentType = file.type;
        const bucketName = process.env.R2_BUCKET_NAME || 'pranav-dental';

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: fileName,
            Body: buffer,
            ContentType: contentType,
        });

        await r2Client.send(command);

        // In a real R2 setup with a custom domain, return the public URL
        const publicUrl = `https://placeholder-r2-domain.com/${fileName}`;

        return NextResponse.json({ success: true, url: publicUrl });
    } catch (error) {
        console.error('Error uploading to R2:', error);
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }
}
