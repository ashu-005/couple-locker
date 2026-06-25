import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateLocker() {

    const [lockerName, setLockerName] = useState("");
    const [targetAmount, setTargetAmount] = useState("");
    const [partnerMobile, setPartnerMobile] = useState("");

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const createLocker = async () => {
        try {

            await api.post("/lockers/create", {
                lockerName,
                targetAmount: Number(targetAmount),
                partnerMobile,
                createdBy: user._id
            });

            alert("Locker Created Successfully");

            navigate("/dashboard");

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to create locker"
            );
        }
    };

    return (
        <div style={{ padding: "20px" }}>

            <h1>Create New Locker</h1>

            <input
                type="text"
                placeholder="Locker Name"
                value={lockerName}
                onChange={(e) =>
                    setLockerName(e.target.value)
                }
            />

            <br />
            <br />

            <input
                type="number"
                placeholder="Target Amount"
                value={targetAmount}
                onChange={(e) =>
                    setTargetAmount(e.target.value)
                }
            />

            <br />
            <br />

            <input
                type="text"
                placeholder="Partner Mobile Number"
                value={partnerMobile}
                onChange={(e) =>
                    setPartnerMobile(e.target.value)
                }
            />

            <br />
            <br />

            <button onClick={createLocker}>
                Create Locker
            </button>

            <button
                onClick={() => navigate("/dashboard")}
                style={{ marginLeft: "10px" }}
            >
                Back
            </button>

        </div>
    );
}

export default CreateLocker;
