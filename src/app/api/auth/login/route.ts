// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import {
	CognitoIdentityProviderClient,
	InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { calculateSecretHash } from "@/utils/cognito-helpers";

const client = new CognitoIdentityProviderClient({
	region: process.env.AWS_REGION,
});

export async function POST(request: Request) {
	try {
		const { email, password } = await request.json();

		const command = new InitiateAuthCommand({
			AuthFlow: "USER_PASSWORD_AUTH",
			ClientId: process.env.COGNITO_CLIENT_ID!,
			AuthParameters: {
				USERNAME: email,
				PASSWORD: password,
				SECRET_HASH: calculateSecretHash(email),
			},
		});

		const response = await client.send(command);
		console.log("Login response:", response);

		// Store user info in session
		const userData = {
			email,
			accessToken: response.AuthenticationResult?.AccessToken,
			refreshToken: response.AuthenticationResult?.RefreshToken,
		};

		const headers = new Headers();
		headers.append(
			"Set-Cookie",
			`userData=${JSON.stringify(
				userData
			)}; Path=/; HttpOnly; Secure; SameSite=Strict`
		);

		return NextResponse.json(
			{
				success: true,
				message: "Login successful",
				user: { email },
			},
			{ headers }
		);
	} catch (error: any) {
		return NextResponse.json(
			{
				success: false,
				message: error.message || "An error occurred during login",
			},
			{
				status: 400,
			}
		);
	}
}
