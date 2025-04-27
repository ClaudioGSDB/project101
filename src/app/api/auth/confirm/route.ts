// src/app/api/auth/confirm/route.ts
import { NextResponse } from "next/server";
import {
	CognitoIdentityProviderClient,
	ConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { calculateSecretHash } from "@/utils/cognito-helpers";

const client = new CognitoIdentityProviderClient({
	region: process.env.AWS_REGION,
});

export async function POST(request: Request) {
	try {
		const { email, confirmationCode } = await request.json();

		// Log the received data for debugging
		console.log("Confirmation attempt:", { email, confirmationCode });

		const command = new ConfirmSignUpCommand({
			ClientId: process.env.COGNITO_CLIENT_ID!,
			Username: email,
			ConfirmationCode: confirmationCode,
			SecretHash: calculateSecretHash(email),
		});

		await client.send(command);

		return NextResponse.json({
			success: true,
			message: "User confirmed successfully",
		});
	} catch (error: any) {
		return NextResponse.json(
			{
				success: false,
				message: error.message || "An error occurred during confirmation",
			},
			{ status: 400 }
		);
	}
}
