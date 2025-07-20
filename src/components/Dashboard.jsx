import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import '../cascading/Dashboard.css'; // Import external CSS

function Dashboard() {
  const [accountData, setAccountData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const fetchAccount = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user"));
      const res = await axios.get("http://localhost:3000/api/bank/getbank", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAccountData(res.data);
    } catch (error) {
      console.error("Failed to fetch account data:", error);
      alert("Failed to load account data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this account?")) return;
    try {
      const token = JSON.parse(localStorage.getItem("user"));
      await axios.delete(`http://localhost:3000/api/bank/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAccountData((prev) => prev.filter((acc) => acc._id !== id));
      alert("Bank account deleted successfully!");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete account.");
    }
  };

  const handleUpdate = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user"));
      await axios.put(`http://localhost:3000/api/bank/update/${selectedAccount._id}`, selectedAccount, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAccountData((prev) =>
        prev.map((acc) => (acc._id === selectedAccount._id ? selectedAccount : acc))
      );

      setShowModal(false);
      alert("Account updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update account.");
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h2 className="dashboard-heading">Bank Accounts</h2>
        {accountData.length === 0 ? (
          <p className="no-accounts">No bank accounts found.</p>
        ) : (
          <div className="account-grid">
            {accountData.map((account) => (
              <div key={account._id} className="account-card">
                <Detail label="Account Holder" value={account.accountHolderName} />
                <Detail label="Account Number" value={account.accountNumber} />
                <Detail label="Bank Name" value={account.bankName} />
                <Detail label="Branch Name" value={account.branchName} />
                <Detail label="IFSC Code" value={account.ifscCode} />
                <Detail label="User Name" value={account.user?.username} />
                <Detail label="User Email" value={account.user?.email} />

                <div className="action-buttons">
                  <button
                    onClick={() => {
                      setSelectedAccount(account);
                      setShowModal(true);
                    }}
                    className="btn-update"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(account._id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && selectedAccount && (
          <div className="modal-overlay">
            <div className="modal">
              <h3 className="modal-title">Update Bank Account</h3>
              <input
                type="text"
                placeholder="Account Holder"
                value={selectedAccount.accountHolderName}
                onChange={(e) =>
                  setSelectedAccount({ ...selectedAccount, accountHolderName: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Account Number"
                value={selectedAccount.accountNumber}
                onChange={(e) =>
                  setSelectedAccount({ ...selectedAccount, accountNumber: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Bank Name"
                value={selectedAccount.bankName}
                onChange={(e) =>
                  setSelectedAccount({ ...selectedAccount, bankName: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Branch Name"
                value={selectedAccount.branchName}
                onChange={(e) =>
                  setSelectedAccount({ ...selectedAccount, branchName: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="IFSC Code"
                value={selectedAccount.ifscCode}
                onChange={(e) =>
                  setSelectedAccount({ ...selectedAccount, ifscCode: e.target.value })
                }
              />

              <div className="modal-actions">
                <button onClick={() => setShowModal(false)} className="btn-cancel">Cancel</button>
                <button onClick={handleUpdate} className="btn-save">Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const Detail = ({ label, value }) => (
  <div className="detail-row">
    <span className="detail-label">{label}</span>
    <span className="detail-value">{value}</span>
  </div>
);

export default Dashboard;
