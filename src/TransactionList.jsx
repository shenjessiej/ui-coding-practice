import { useMemo, useState } from 'react'

/**
 * 1. Given an array of objects display the data in a list format
 * 2. Find the top customer
 *   1. The top customer is the customer with the highest transaction amount. 
 * 3. Dynamically highlight the top customer using CSS
 * 4. Add a search input that filters the list
 */

const TRANSACTIONS =
    [{ id: "t_101", customer: "Alice Anderson", amount: 84 },
    { id: "t_102", customer: "Bob Brown", amount: 30 },
    { id: "t_103", customer: "Carla Carter", amount: 42 },
    { id: "t_104", customer: "David Davis", amount: 26 },
    { id: "t_105", customer: "Evelyn Edwards", amount: -84 },
    { id: "t_106", customer: "Frank Foster", amount: 48 },
    { id: "t_107", customer: "Gina Green", amount: 104 },
    { id: "t_108", customer: "Henry Harris", amount: 140 },
    { id: "t_109", customer: "Ivy Ingram", amount: 10 },
    { id: "t_110", customer: "Jack Johnson", amount: 60 },
    { id: "t_111", customer: "Kara King", amount: -26 },
    { id: "t_112", customer: "Liam Lee", amount: -140 },
    { id: "t_113", customer: "Mia Martin", amount: 26 },
    { id: "t_114", customer: "Nina Nelson", amount: 44 },
    { id: "t_115", customer: "Henry Harris", amount: 250 },

    ];

function TransactionList() {
    const [transactions, setTransactions] = useState(TRANSACTIONS)
    const [searchKey, setSearchKey] = useState("");

    const filteredTransactions = useMemo(() => {
        return transactions.filter((transaction) =>
            transaction.customer.toLowerCase().includes(searchKey.toLowerCase()) ||
            transaction.amount.toString().toLowerCase().includes(searchKey.toLowerCase())
        );
    }, [transactions, searchKey]);

    // use memo to cache this in between renders if customers array is not changed
    const topCustomer = useMemo(() => {
        const top = filteredTransactions.reduce((max, transaction) => {
            return transaction.amount > max.amount ? transaction : max;
        }, { amount: -Infinity });

        return top.customer || null;
    }, [filteredTransactions]);

    function handleInputChange(e) {
        setSearchKey(e.target.value);
    }


    return (
        <>
            <input
                type="text"
                value={searchKey}
                onChange={handleInputChange}
            />

            <ul>
                {
                    filteredTransactions.length === 0 ? (<li>No results found.</li>) : filteredTransactions.map((transaction) => {
                        return (<li
                            style={{ backgroundColor: topCustomer && transaction.customer === topCustomer ? "yellow" : "" }}
                            key={transaction.id}>
                            {transaction.customer}: {transaction.amount}
                        </li>)
                    })
                }
            </ul>
        </>
    )
}

export default TransactionList;
