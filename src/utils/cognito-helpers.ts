import crypto from "crypto";

export function calculateSecretHash(username: string) {
	const message = username + process.env.COGNITO_CLIENT_ID;
	const hash = crypto
		.createHmac("SHA256", process.env.COGNITO_CLIENT_SECRET!)
		.update(message)
		.digest("base64");
	return hash;
}
