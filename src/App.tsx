import { useState } from "react";
import "./App.css";
type Contact = {
    id: number;
    name: string;
    phone: string;
    email: string;
};
function App() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [editId, setEditId] = useState<number | null>(null);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("A-Z");
function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (editId !== null) {
            const updatedContacts = contacts.map(function(item) {
                if (item.id === editId) {
                    return {
                        id: item.id,
                        name: name,
                        phone: phone,
                        email: email
                    };
                }
                return item;
            });
            setContacts(updatedContacts);
            setEditId(null);
        } else {
            const newContact: Contact = {
                id: Date.now(),
                name: name,
                phone: phone,
                email: email
            };
            setContacts([...contacts, newContact]);
        }
        setName("");
        setPhone("");
        setEmail("");
    }
    function editContact(item: Contact) {
        setName(item.name);
        setPhone(item.phone);
        setEmail(item.email);
        setEditId(item.id);
    }
    function deleteContact(id: number) {
        const updatedContacts = contacts.filter(function(item) {
            return item.id !== id;
        });
        setContacts(updatedContacts);
    }
    // Search contacts by name or phone number
    const filteredContacts = contacts.filter(function(item) {
        return (
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.phone.includes(search)
        );
    });
    // Sort contacts by name
    const sortedContacts = [...filteredContacts].sort(function(a, b) {
        if (sortOrder === "A-Z") {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });
    return (
        <div className="container">
            <h1>Contact Directory</h1>
            <p className="subtitle">Manage your contacts easily</p>
            <div className="contact-form">
                <h2>{editId !== null ? "Edit Contact" : "Add New Contact"}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={function(e) {
                            setName(e.target.value);
                        }}
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Enter Phone Number"
                        value={phone}
                        onChange={function(e) {
                            setPhone(e.target.value);
                        }}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={function(e) {
                            setEmail(e.target.value);
                        }}
                        required
                    />
                    <button type="submit" className="add-btn">
                        {editId !== null ? "Update Contact" : "Add Contact"}
                    </button>
                    {editId !== null && (
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={function() {
                                setEditId(null);
                                setName("");
                                setPhone("");
                                setEmail("");
                            }}
                        >
                            Cancel Edit
                        </button>
                    )}
                </form>
            </div>
            {/* Search and Sorting */}
            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search by name or phone number"
                    value={search}
                    onChange={function(e) {
                        setSearch(e.target.value);
                    }}
                />
                <select
                    value={sortOrder}
                    onChange={function(e) {
                        setSortOrder(e.target.value);
                    }}
                >
                    <option value="A-Z">Name (A-Z)</option>
                    <option value="Z-A">Name (Z-A)</option>
                </select>
            </div>
            <h2 className="list-heading">
                My Contacts ({contacts.length})
            </h2>
            <div className="contact-list">
                {contacts.length === 0 ? (
                    <p className="empty-message">
                        No contacts added yet.
                    </p>
                ) : sortedContacts.length === 0 ? (
                    <p className="empty-message">
                        No matching contacts.
                    </p>
                ) : (
                    sortedContacts.map(function(item) {
                        return (
                            <div className="contact-card" key={item.id}>
                                <h3>{item.name}</h3>
                                <p>
                                    <strong>Phone:</strong> {item.phone}
                                </p>
                                <p>
                                    <strong>Email:</strong> {item.email}
                                </p>
                                <div className="card-buttons">
                                    <button
                                        className="edit-btn"
                                        onClick={function() {
                                            editContact(item);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={function() {
                                            deleteContact(item.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
export default App;