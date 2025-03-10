import { Alert, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

interface Transaction {
    id: string;
    date: string;
    amount: string;
    merchant: string;
    category: string;
}
const ExpensesTable: React.FC = () => {
    const [transactions, setTransactions] =  useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        fetch("https://tip-transactions.vercel.app/api/transactions?page=1")
        .then((response)=> {
            if(!response.ok) {
                throw new Error("Failed to fetch Expense Details");
            }
            return response.json();
        })
        .then((data)=> {
            console.log("data", data);
            setTransactions(data.transactions);
            setLoading(false);
        })
        .catch((error)=> {
            setError(error.message);
            setLoading(false);
        });
    }, []);
    if(loading) return <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}><CircularProgress /></div>
    if(error) return <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}><Alert severity="error">Error: {error}</Alert></div>
    return (
        <>
        <Typography variant="h4" gutterBottom align="center"> Expenses</Typography>
        <TableContainer component={Paper} style={{maxWidth: "80%", margin: "20px auto", borderColor: "#d4d3d2"}}>
            
            <Table>
                <TableHead>
                    <TableRow style={{background: "#e6e5e3"}}>
                        <TableCell style={{color: "#000000", fontWeight: "bold", borderRight: '1px solid #d4d3d2' }}>ID</TableCell>
                        <TableCell style={{color: "#000000", fontWeight: "bold", borderRight: '1px solid #d4d3d2' }}>Date</TableCell>
                        <TableCell style={{color: "#000000", fontWeight: "bold", borderRight: '1px solid #d4d3d2' }}>Amount</TableCell>
                        <TableCell style={{color: "#000000", fontWeight: "bold", borderRight: '1px solid #d4d3d2' }}>Merchant</TableCell>
                        <TableCell style={{color: "#000000", fontWeight: "bold"}}>Category</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((txn) => (
                        <TableRow key={txn.id}>
                            <TableCell sx={{ borderRight: '1px solid #d4d3d2' }}>{txn.id}</TableCell>
                            <TableCell sx={{ borderRight: '1px solid #d4d3d2' }}>{new Date(txn.date).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} - {new Date(txn.date).toLocaleDateString()}</TableCell>
                            <TableCell sx={{ borderRight: '1px solid #d4d3d2' }}>£{txn.amount}</TableCell>
                            <TableCell sx={{ borderRight: '1px solid #d4d3d2' }}>{txn.merchant}</TableCell>
                            <TableCell>{txn.category}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
        
    )
};

export default ExpensesTable;