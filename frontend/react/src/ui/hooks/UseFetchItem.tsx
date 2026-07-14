import { useEffect, useState } from "react";

export function useFetchItem<T>(getItem: () => Promise<Response>) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [item, setItem] = useState<T | null>(null);
	const [error, setError] = useState<string | null>(null);

	const fetchItem = async () => {
		await getItem()
			.then((response) => {
				if (!response.ok) {
					throw new Error("Unable to retrieve board at this time.");
				}
				return response.json();
			})
			.then((data) => {
				setItem(data);
			})
			.catch((error) => {
				if (error.message) {
					setError(error.message);
				} else {
					setError("A problem occurred, please try again later.");
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		setError(null);
		setIsLoading(true);
		fetchItem();
	}, [getItem]);

	return { isLoading, item, error };
}
