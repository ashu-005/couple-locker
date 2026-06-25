import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import InvitationCard from "../components/InvitationCard";

function Dashboard() {
    const [lockers, setLockers] = useState([]);
    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const fetchInvitations = async () => {
        try {
            const response = await api.get(
            `/lockers/invitations/${user._id}`
                        );

            setInvitations(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchLockers = async () => {
        try {
        const response = await api.get(
                `/lockers/user/${user._id}`
        );

            setLockers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                if (!user) {
                    setLoading(false);
                    return;
                }

                await fetchLockers();
                await fetchInvitations();
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    if (!user) {
        return <h1>Please Login First</h1>;
    }

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>Welcome {user.name}</h1>

            <button
                onClick={() => navigate("/create-locker")}
                style={{ marginRight: "10px" }}
            >
                Create New Locker
            </button>

            <button onClick={logout}>
                Logout
            </button>

            <hr />

            <h2>Invitations</h2>

            {invitations.length === 0 ? (
                <p>No Invitations</p>
            ) : (
                invitations.map((invitation) => (
                    <InvitationCard
                        key={invitation._id}
                        invitation={invitation}
                        onRefresh={() => {
                            fetchInvitations();
                            fetchLockers();
                        }}
                    />
                ))
            )}

            <hr />

            <h2>My Lockers</h2>

            {lockers.length === 0 ? (
                <p>No Lockers Found</p>
            ) : (
                lockers.map((locker) => (
                    <div
                        key={locker._id}
                        style={{
                            border: "1px solid black",
                            padding: "10px",
                            marginBottom: "10px"
                        }}
                    >
                        <h3>{locker.lockerName}</h3>

                        <p>
                            <strong>Current Balance:</strong>
                            {" "}₹{locker.currentBalance}
                        </p>

                        <p>
                            <strong>Target Amount:</strong>
                            {" "}₹{locker.targetAmount}
                        </p>

                        <p>
                            <strong>Status:</strong>
                            {" "}{locker.status}
                        </p>

                        <p>
                            <strong>Partner:</strong>
                            {" "}{locker.partner?.name}
                        </p>

                        <button
                            onClick={() =>
                                navigate(`/locker/${locker._id}`)
                            }
                        >
                            View Locker
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default Dashboard;
