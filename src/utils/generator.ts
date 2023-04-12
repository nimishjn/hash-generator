import CryptoJS from 'crypto-js';
import * as _Jimp from 'jimp';
// @ts-ignore
const Jimp = typeof self !== 'undefined' ? self.Jimp || _Jimp : _Jimp;

interface props {
	imageSrc: string;
	password: string;
	gridIndexChosen: number[];
}

export const hashGenerator = async ({
	imageSrc,
	password,
	gridIndexChosen,
}: props) => {
	const finalHash = await Jimp.read(imageSrc)
		.then(async (img: any) => {
			// This first compress the png data file into 100x100 square using resize()
			// This get the base 64 string of the compressed image file
			const data = await img.resize(100, 100).getBase64Async('image/png');

			// This hashes the base 64 string to give 512 bits output
			const hash = CryptoJS.SHA512(data).toString();

			// This finds the size of each splits required to map each grid (here 16 grids)
			const interval = Math.floor(hash.length / 16);

            // This extracts the hash intervals with respect to rank given by user
			const patternHash = gridIndexChosen
				.map((e) =>
					hash.slice(
						(e - 1) * interval,
						(e - 1) * interval + interval
					)
				)
				.join('');

            // This hashes the pattern hash with the password to give the final hash
			return CryptoJS.SHA512(patternHash + password).toString();
		})
		.catch((err: any) => {
			console.error(err);
		});
	return finalHash;
};
