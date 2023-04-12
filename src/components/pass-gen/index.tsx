'use client';

import { Alert, Snackbar, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import ChooseImage from './ChooseImage';
import ImageGrid from './ImageGrid';
import { passwordImagesData } from '@/utils/images';
import { StaticImageData } from 'next/image';
import { hashGenerator } from '@/utils/generator';
import { BiReset } from 'react-icons/bi';

interface props {
	setHashed: (newHash: string) => void;
}

function PasswordGenerator({ setHashed }: props) {
	const [image, setImage] = useState<StaticImageData | null>(null);
	const [password, setPassword] = useState('');
	const [gridIndexChosen, setGridIndexChosen] = useState<Array<number>>([]);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	const handleImageChange = (file: number | StaticImageData) => {
		if (typeof file === 'number') setImage(passwordImagesData[file]);
		else setImage(file);
	};

	const handlePasswordChange = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setPassword(event.target.value);
	};

	const toggleGridIndexChosen = (index: number) => {
		if (gridIndexChosen.find((e) => e === index))
			setGridIndexChosen(gridIndexChosen.filter((e) => e !== index));
		else setGridIndexChosen([...gridIndexChosen, index]);
	};

	const checkErrors = () => {
		if (password.length === 0) return 'Please enter a password';
		if (password.length < 8)
			return 'Password must be at least 8 characters long';
		if (!image?.src) return 'Please choose/upload an image';
		if (gridIndexChosen.length < 4)
			return 'Please choose 4 grid indexes for pattern';
		return '';
	};

	const generateHash = async () => {
		setLoading(true);

		const errorMessage = checkErrors();

		if (errorMessage) {
			setError(errorMessage);
			setSnackbarOpen(true);
			setLoading(false);
			return;
		}

		const finalHash = await hashGenerator({
			gridIndexChosen: gridIndexChosen,
			imageSrc: image?.src || '',
			password: password,
		});

		setHashed(finalHash);
		setLoading(false);
	};

	const resetForm = () => {
		setImage(null);
		setPassword('');
		setGridIndexChosen([]);
		setError('');
		setLoading(false);
	};

	return (
		<div className='flex flex-col items-center gap-5 w-full'>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={3000}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				onClose={() => setSnackbarOpen(false)}
			>
				<Alert
					onClose={() => setSnackbarOpen(false)}
					severity='error'
					sx={{ width: '100%' }}
					variant='filled'
				>
					{error}
				</Alert>
			</Snackbar>
			<TextField
				id='outlined-basic'
				label='Password or Random string'
				variant='outlined'
				value={password}
				onChange={handlePasswordChange}
				fullWidth
			/>
			{!image?.src ? (
				<ChooseImage handleImageChange={handleImageChange} />
			) : (
				<ImageGrid
					imageData={image}
					gridChosen={gridIndexChosen}
					toggleGridIndexChosen={toggleGridIndexChosen}
				/>
			)}
			<button
				onClick={generateHash}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
				disabled={loading}
			>
				{loading ? 'Loading...' : 'Generate Hash'}
			</button>
			<button
				title='Reset'
				className='absolute top-4 right-4 text-2xl'
				onClick={resetForm}
			>
				<BiReset />
			</button>
		</div>
	);
}

export default PasswordGenerator;
