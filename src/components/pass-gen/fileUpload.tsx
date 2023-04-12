import { StaticImageData } from 'next/image';
import { ChangeEvent } from 'react';

import * as _Jimp from 'jimp';
// @ts-ignore
const Jimp = typeof self !== 'undefined' ? self.Jimp || _Jimp : _Jimp;

function FileUpload({
	handleImageChange,
}: {
	handleImageChange: (index: number | StaticImageData) => void;
}) {
	const handleOnFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const imgUrl = URL.createObjectURL(e.target.files![0]);

		const newImageUrl = await Jimp.read(imgUrl)
			.then(async (img: any) => {
				const data = await img
					.cover(1000, 1000)
					.getBase64Async('image/png');

				return data;
			})
			.catch((err: any) => {
				console.error(err);
			});

		handleImageChange({
			height: 1000,
			width: 1000,
			src: newImageUrl,
		});
	};
	return (
		<div className='mb-3 w-64'>
			<input
				className='relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-gray-300 bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-gray-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-gray-100 file:px-3 file:py-[0.32rem] file:text-gray-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-gray-200 focus:border-primary focus:text-gray-700 focus:shadow-te-primary focus:outline-none dark:border-gray-600 dark:text-gray-200 dark:file:bg-gray-700 dark:file:text-gray-100 dark:focus:border-primary'
				type='file'
				id='formFile'
				accept='image/png'
				onChange={handleOnFileChange}
			/>
		</div>
	);
}

export default FileUpload;
