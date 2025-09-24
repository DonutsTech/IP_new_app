"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface UserData {
	id: string;
	name?: string;
	email?: string;
}

interface UserContextProps {
	user: UserData;
	setUser: (user: UserData) => void;
}

const defaultUser: UserData = {
	id: "",
	name: "",
	email: "",
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<UserData>(defaultUser);

	useEffect(() => {
		console.log("User updated:", user);
	},[user])

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

export function useUser() {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser deve ser usado dentro de UserProvider");
	}
	return context;
}
