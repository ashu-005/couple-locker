import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function LockerDetails() {
    const { id } = useParams();

    const [locker, setLocker] = useState(null);
    const [transactions, setTransactions] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    const fetchLocker = async () => {
        try {
            const response = await api.get(
                `/lockers/${id}`
            );

            setLocker(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const fetchTransactions = async () => {
        try {
            const response = await api.get(
                `/lockers/${id}/transactions`
            );

            setTransactions(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchLocker();
        fetchTransactions();
    }, []);

    const addMoney = async () => {
        try {
            await api.post(
                `/lockers/${id}/add-money`,
                {
                    userId: user._id
                }
            );

            fetchLocker();
            fetchTransactions();

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Unable to add money"
            );
        }
    };

    if (!locker) {
        return <h1>Loading...</h1>;
    }

    const progress = Math.min(
        (locker.currentBalance /
            locker.targetAmount) * 100,
        100
    );

    return (
        <div style={{ padding: "20px" }}>
            <h1>{locker.lockerName}</h1>

            <p>
                <strong>Current Balance:</strong>
                ₹{locker.currentBalance}
            </p>

            <p>
                <strong>Target Amount:</strong>
                ₹{locker.targetAmount}
            </p>

            <p>
                <strong>Status:</strong>
                {locker.status}
            </p>

            <p>
                <strong>Partner:</strong>
                {locker.partner?.name}
            </p>

            {locker.status !== "Completed" && (
                <button onClick={addMoney}>
                    Add ₹100
                </button>
            )}

            <br />
            <br />

            <div
                style={{
                    width: "300px",
                    border: "1px solid black"
                }}
            >
                <div
                    style={{
                        width: `${progress}%`,
                        height: "20px",
                        backgroundColor: "green"
                    }}
                />
            </div>

            <p>
                Progress:
                {progress.toFixed(0)}%
            </p>

            {locker.status === "Completed" && (
                <h2>
                    Congratulations! Your goal has been completed.
                </h2>
            )}

            <hr />

            <h2>Transaction History</h2>

            {transactions.length === 0 ? (
                <p>No Transactions Yet</p>
            ) : (
                transactions.map((transaction) => (
                    <div
                        key={transaction._id}
                        style={{
                            border: "1px solid gray",
                            padding: "10px",
                            marginBottom: "10px"
                        }}
                    >
                        <p>
                            <strong>Added By:</strong>{" "}
                            {transaction.addedBy?.name}
                        </p>

                        <p>
                            <strong>Amount:</strong>{" "}
                            ₹{transaction.amount}
                        </p>

                        <p>
                            <strong>Date:</strong>{" "}
                            {new Date(
                                transaction.createdAt
                            ).toLocaleString()}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}

export default LockerDetails;
