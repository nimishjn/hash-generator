import Image, { StaticImageData } from 'next/image';

interface props {
	imageData: StaticImageData | null;
	gridChosen: number[];
	toggleGridIndexChosen: (index: number) => void;
}

function ImageGrid({ imageData, gridChosen, toggleGridIndexChosen }: props) {
	if (!imageData) return <p>error</p>;

	return (
		<div className='flex flex-col items-center justify-center'>
			<p>Select atleast 4 grid</p>
			<div className='relative w-96 h-96 border border-black'>
				<div className='absolute w-full h-full'>
					<Image src={imageData} alt='' width={1000} height={1000} />
				</div>
				<div className='h-full cursor-pointer grid grid-cols-4'>
					{Array.from(Array(16).keys()).map((e) => {
						const gridNumber = e + 1;
						const position = gridChosen.indexOf(gridNumber) + 1;

						return (
							<div
								className='relative border-0.5 border-white flex items-center justify-center bg-opacity-50'
								style={{
									backgroundColor: gridChosen.find(
										(i) => i === gridNumber
									)
										? 'rgba(255, 255, 255, 0.8)'
										: 'transparent',
								}}
								onClick={() =>
									toggleGridIndexChosen(gridNumber)
								}
								key={gridNumber}
							>
								{position !== 0 && (
									<div
										style={{
											color: gridChosen.find(
												(i) => i === gridNumber
											)
												? 'rgb(0, 174, 24)'
												: 'black',
										}}
										className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square bg-white w-7 h-7 p-1 text-base rounded-full flex items-center justify-center border border-gray-700'
									>
										{position}
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default ImageGrid;
