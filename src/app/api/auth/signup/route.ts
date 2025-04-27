// src/app/api/auth/signup/route.ts

import { NextResponse } from "next/server";
import {
	CognitoIdentityProviderClient,
	SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { calculateSecretHash } from "@/utils/cognito-helpers";

const client = new CognitoIdentityProviderClient({
	region: process.env.AWS_REGION,
});

export async function POST(request: Request) {
	try {
		const { email, password, name, dob } = await request.json();

		const command = new SignUpCommand({
			ClientId: process.env.COGNITO_CLIENT_ID!,
			Username: email,
			Password: password,
			SecretHash: calculateSecretHash(email),
			UserAttributes: [
				{ Name: "name", Value: name },
				{ Name: "birthdate", Value: dob },
				{ Name: "email", Value: email },
			],
		});

		const response = await client.send(command);
		console.log("SignUp response:", response);

		return NextResponse.json({
			success: true,
			message: "User signed up successfully",
			userSub: response.UserSub,
		});
	} catch (error: any) {
		return NextResponse.json(
			{
				success: false,
				message: error.message || "An error occurred during sign up",
			},
			{ status: 400 }
		);
	}
}
