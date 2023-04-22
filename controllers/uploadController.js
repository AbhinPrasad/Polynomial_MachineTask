import multer from "multer";
import { google } from "googleapis";
import mime from "mime";
import stream from "stream";
import dotenv from "dotenv";
dotenv.config();

const oauth2Client = new google.auth.OAuth2(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	process.env.CALLBACK_URL
);

export const fileUpload = async (req, res) => {
	try {
		console.log(req.file);
		if (!req.file) {
			res.status(400).json({ error: "No file provided" });
		}

		//Gdrive file upload
		const credentials = req.session.credentials; //accesstoken

		if (!credentials) {
			res.status(401).json({
				error: "Authentication credentials not found"
			});
		}

		oauth2Client.setCredentials({
			access_token: credentials.access_token,
			refresh_token: credentials.refresh_token
		});
     
		const drive = google.drive({
			version: "v3",
			auth: oauth2Client
		});

		const { originalname, buffer } = req.file;
		const bufferStream = new stream.PassThrough();
		bufferStream.end(buffer);

		const fileMimeType = mime.getType(req.file.originalname);
		console.log(fileMimeType);

		const response = await drive.files.create({
			requestBody: {
				name: originalname
			},
			media: {
				mimeType: fileMimeType,
				body: bufferStream
			}
		});

		//if multer generates an error
		if (req.fileValidationError instanceof multer.MulterError) {
			res.status(400).json({ error: "File size limit exceeded" });
		} else if (req.fileValidationError) {
			res.status(400).json({ error: req.fileValidationError });
		}

		res.status(200).json(
			`File ${originalname} uploaded to Google Drive with ID: ${response.data.id}`
		);
	} catch (error) {
		console.log(error, "fileupload error");
		res.status(500).json(error.message);
	}
};
