'use client';

import PasswordGenerator from '@/components/pass-gen';
import { useState } from 'react';

function page() {
	const [hashed, setHashed] = useState('');

	return (
		<div className='min-h-screen p-10 min-w-full m-auto flex gap-5 justify-center items-stretch'>
			<div className='relative flex flex-col items-center w-full justify-start gap-5 border-gray-800 border-2 rounded-md max-w-xl p-3'>
				<h1 className='text-2xl font-bold'>Generator</h1>
				<PasswordGenerator setHashed={setHashed} />
			</div>
			<div className='flex items-center text-3xl'>{'→'}</div>
			<div className='relative flex flex-col items-center w-full justify-start gap-5 border-gray-800 border-2 rounded-md max-w-xl p-3'>
				<h1 className='text-2xl font-bold'>Hash to be stored</h1>
				<p className='text-3xl break-words text-left overflow-hidden break-all text-gray-600'>
					{hashed || "Please generate the hash"}
				</p>
			</div>
		</div>
	);
}

export default page;
