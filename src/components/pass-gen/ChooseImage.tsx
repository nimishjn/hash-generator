import { passwordImagesData } from '@/utils/images';
import Image, { StaticImageData } from 'next/image';
import FileUpload from './fileUpload';

function ChooseImage({
	handleImageChange,
}: {
	handleImageChange: (index: number | StaticImageData) => void;
}) {
	return (
		<div className='flex flex-col justify-center items-center gap-1'>
			<p>Select an image</p>
			<div className='w-96 h-96 bg-gray-400 bg-opacity-25 p-2 grid grid-cols-3 gap-2 overflow-y-auto'>
				{passwordImagesData.map((e, i) => {
					return (
						<div
							className='cursor-pointer opacity-70 hover:opacity-100'
							onClick={() => handleImageChange(i)}
							key={i}
						>
							<Image
								placeholder='blur'
								src={e}
								alt=''
								width={200}
								height={200}
							/>
						</div>
					);
				})}
			</div>
			<FileUpload handleImageChange={handleImageChange} />
		</div>
	);
}

export default ChooseImage;
