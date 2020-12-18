export interface User {
    Code: number,
    Message: string,
    Data: {
        Username: string,
		Balance: string,
		Email: string,
		Role: string
    }
}