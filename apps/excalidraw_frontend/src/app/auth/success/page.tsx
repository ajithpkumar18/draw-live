'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthSuccess() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');
        const name = searchParams.get('name');
        const email = searchParams.get('email');

        if (token && name && email) {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify({ name, email }));
            router.push('/main');
        }
    }, [searchParams, router]);

    return <p>Redirecting...</p>;
}
