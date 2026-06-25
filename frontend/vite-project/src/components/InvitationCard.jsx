import api from "../services/api";

function InvitationCard({ invitation, onRefresh }) {

    const acceptInvitation = async () => {
        try {
            await api.put(
                `/lockers/${invitation._id}/accept`
            );

            alert("Invitation Accepted");

            onRefresh();
        } catch (error) {
            console.log(error);
        }
    };

    const rejectInvitation = async () => {
        try {
            await api.put(
                `/lockers/${invitation._id}/reject`
            );

            alert("Invitation Rejected");

            onRefresh();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h3>{invitation.lockerName}</h3>

            <button onClick={acceptInvitation}>
                Accept
            </button>

            <button onClick={rejectInvitation}>
                Reject
            </button>
        </div>
    );
}

export default InvitationCard;
