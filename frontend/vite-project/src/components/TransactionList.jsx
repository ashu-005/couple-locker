function TransactionList({ transactions }) {

    return (
        <div>
            <h2>Transactions</h2>

            {
                transactions.map((transaction) => (
                    <div key={transaction._id}>
                        ₹{transaction.amount}

                        Added by

                        {transaction.addedBy.name}
                    </div>
                ))
            }
        </div>
    );
}

export default TransactionList;
