import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const seedMembers = [
  {
    id: 1,
    name: "Aarav Shetty",
    email: "aarav@gmail.com",
    phone: "9876543210",
    plan: "Premium",
    joinDate: "2026-08-12",
    expiryDate: "2027-08-12",
    status: "Active"
  },
  {
    id: 2,
    name: "Ananya Rao",
    email: "ananya@gmail.com",
    phone: "9876501234",
    plan: "Standard",
    joinDate: "2026-07-21",
    expiryDate: "2026-10-21",
    status: "Active"
  },
  {
    id: 3,
    name: "Rahul Kumar",
    email: "rahul@gmail.com",
    phone: "9876512345",
    plan: "Basic",
    joinDate: "2026-06-04",
    expiryDate: "2026-07-04",
    status: "Expired"
  },
  {
    id: 4,
    name: "Sneha Pai",
    email: "sneha@gmail.com",
    phone: "9876523456",
    plan: "Premium",
    joinDate: "2026-09-02",
    expiryDate: "2027-09-02",
    status: "Active"
  }
];

const seedPlans = [
  {
    id: 1,
    name: "Basic",
    duration: "1 Month",
    price: 999,
    features: "Gym access, Locker"
  },
  {
    id: 2,
    name: "Standard",
    duration: "3 Months",
    price: 2499,
    features: "Gym access, Locker, Group classes"
  },
  {
    id: 3,
    name: "Premium",
    duration: "12 Months",
    price: 7999,
    features: "All access, Locker, Classes, Personal trainer"
  }
];

const seedPayments = [
  {
    id: 1,
    member: "Aarav Shetty",
    amount: 7999,
    date: "2026-08-12",
    method: "UPI",
    status: "Paid"
  },
  {
    id: 2,
    member: "Ananya Rao",
    amount: 2499,
    date: "2026-07-21",
    method: "Card",
    status: "Paid"
  },
  {
    id: 3,
    member: "Rahul Kumar",
    amount: 999,
    date: "2026-06-04",
    method: "Cash",
    status: "Pending"
  }
];

const seedAttendance = [
  {
    id: 1,
    member: "Aarav Shetty",
    date: "2026-09-30",
    time: "07:30",
    status: "Present"
  },
  {
    id: 2,
    member: "Ananya Rao",
    date: "2026-09-30",
    time: "08:10",
    status: "Present"
  },
  {
    id: 3,
    member: "Sneha Pai",
    date: "2026-09-30",
    time: "18:20",
    status: "Present"
  }
];

function load(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("gymLoggedIn") === "true"
  );

  const [page, setPage] = useState("Dashboard");

  const [members, setMembers] = useState(() =>
    load("members", seedMembers)
  );

  const [plans, setPlans] = useState(() =>
    load("plans", seedPlans)
  );

  const [payments, setPayments] = useState(() =>
    load("payments", seedPayments)
  );

  const [attendance, setAttendance] = useState(() =>
    load("attendance", seedAttendance)
  );

  useEffect(() => save("members", members), [members]);
  useEffect(() => save("plans", plans), [plans]);
  useEffect(() => save("payments", payments), [payments]);
  useEffect(() => save("attendance", attendance), [attendance]);

  if (!loggedIn) {
    return (
      <Login
        onLogin={() => {
          localStorage.setItem("gymLoggedIn", "true");
          setLoggedIn(true);
        }}
      />
    );
  }

  const logout = () => {
    localStorage.removeItem("gymLoggedIn");
    setLoggedIn(false);
    setPage("Dashboard");
  };

  return (
    <div className="app-shell">
      <Sidebar
        page={page}
        setPage={setPage}
        logout={logout}
      />

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">FitSync</p>
            <h1>{page}</h1>
          </div>

          <div className="admin-chip">
            <span className="avatar">A</span>
            <span>Admin</span>
          </div>
        </header>

        {page === "Dashboard" && (
          <Dashboard
            members={members}
            payments={payments}
            attendance={attendance}
            setPage={setPage}
          />
        )}

        {page === "Members" && (
          <Members
            members={members}
            setMembers={setMembers}
            plans={plans}
            payments={payments}
            setPayments={setPayments}
          />
        )}

        {page === "Plans" && (
          <Plans
            plans={plans}
            setPlans={setPlans}
          />
        )}

        {page === "Payments" && (
          <Payments
            payments={payments}
            setPayments={setPayments}
            members={members}
          />
        )}

        {page === "Attendance" && (
          <Attendance
            attendance={attendance}
            setAttendance={setAttendance}
            members={members}
          />
        )}

        {page === "Reports" && (
          <Reports
            members={members}
            payments={payments}
            attendance={attendance}
          />
        )}
      </main>
    </div>
  );
}


/* =========================
   LOGIN
========================= */

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();

    if (
      email === "admin@ironpulse.com" &&
      password === "admin123"
    ) {
      onLogin();
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="brand-mark">FS</div>

        <p className="eyebrow">FitSync</p>

        <h1>Welcome back</h1>

        <p className="muted">
          Manage your gym from one powerful dashboard.
        </p>

        <form
          onSubmit={submit}
          data-testid="login-form"
        >

          <label>
            Email

            <input
              data-testid="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@ironpulse.com"
              required
            />
          </label>

          <label>
            Password

            <input
              data-testid="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>

          {error && (
            <div className="error">
              {error}
            </div>
          )}

          <button
            className="btn primary full"
            type="submit"
          >
            Sign in
          </button>

        </form>

        <div className="demo-login">
          Demo: <b>admin@ironpulse.com</b> /{" "}
          <b>admin123</b>
        </div>

      </div>
    </div>
  );
}


/* =========================
   SIDEBAR
========================= */

function Sidebar({ page, setPage, logout }) {

  const items = [
    ["Dashboard", "⌂"],
    ["Members", "♙"],
    ["Plans", "▣"],
    ["Payments", "₹"],
    ["Attendance", "✓"],
    ["Reports", "▤"]
  ];

  return (
    <aside className="sidebar">

      <div className="logo">
        <span className="logo-box">FS</span>

        <div>
          <b>FitSync</b>
          <small>FITNESS CLUB</small>
        </div>
      </div>

      <nav>
        {items.map(([name, icon]) => (
          <button
            key={name}
            className={
              page === name
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setPage(name)}
          >
            {icon}
            <span>{name}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">

        <div className="support-card">
          <b>Need help?</b>
          <span>
            Check your reports and member activity.
          </span>
        </div>

        <button
          className="nav-item logout"
          onClick={logout}
        >
          ↪
          <span>Logout</span>
        </button>

      </div>
    </aside>
  );
}


/* =========================
   DASHBOARD
========================= */

function Stat({ label, value, sub, icon }) {
  return (
    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{sub}</small>
      </div>

    </div>
  );
}

function Dashboard({
  members,
  payments,
  attendance,
  setPage
}) {

  const active = members.filter(
    m => m.status === "Active"
  ).length;

  const revenue = payments
    .filter(p => p.status === "Paid")
    .reduce(
      (a, p) => a + Number(p.amount),
      0
    );

  return (
    <section>

      <div className="hero">

        <div>
          <span className="pill">
            LIVE OVERVIEW
          </span>

          <h2>
            Train hard. <em>Manage smart.</em>
          </h2>

          <p>
            Everything you need to manage your gym
            smoothly with FitSync.
          </p>
        </div>

        <button
          className="btn light"
          onClick={() => setPage("Members")}
        >
          + Add Member
        </button>

      </div>

      <div className="stats">

        <Stat
          label="Total Members"
          value={members.length}
          sub={`${active} active`}
          icon="♙"
        />

        <Stat
          label="Monthly Revenue"
          value={`₹${revenue.toLocaleString()}`}
          sub="Paid transactions"
          icon="₹"
        />

        <Stat
          label="Today's Attendance"
          value={
            attendance.filter(
              a => a.date === "2026-09-30"
            ).length
          }
          sub="Check-ins"
          icon="✓"
        />

        <Stat
          label="Active Plans"
          value="3"
          sub="Membership options"
          icon="▣"
        />

      </div>

      <div className="grid-2">

        <div className="panel">

          <div className="panel-head">

            <div>
              <h3>Recent Members</h3>
              <p>Latest registrations</p>
            </div>

            <button
              className="text-btn"
              onClick={() => setPage("Members")}
            >
              View all →
            </button>

          </div>

          <div className="member-list">

            {members
              .slice(-4)
              .reverse()
              .map(m => (

                <div
                  className="member-row"
                  key={m.id}
                >

                  <div className="avatar small">
                    {m.name[0]}
                  </div>

                  <div>
                    <b>{m.name}</b>
                    <span>
                      {m.plan} · {m.joinDate}
                    </span>
                  </div>

                  <span
                    className={`status ${m.status.toLowerCase()}`}
                  >
                    {m.status}
                  </span>

                </div>

              ))}

          </div>
        </div>

        <div className="panel">

          <div className="panel-head">

            <div>
              <h3>Quick Actions</h3>
              <p>Common tasks</p>
            </div>

          </div>

          <div className="quick-grid">

            <button
              onClick={() => setPage("Members")}
            >
              ♙
              <b>Add member</b>
              <span>Register a new member</span>
            </button>

            <button
              onClick={() => setPage("Payments")}
            >
              ₹
              <b>Record payment</b>
              <span>Add a transaction</span>
            </button>

            <button
              onClick={() => setPage("Attendance")}
            >
              ✓
              <b>Mark attendance</b>
              <span>Track today's check-in</span>
            </button>

            <button
              onClick={() => setPage("Reports")}
            >
              ▤
              <b>View reports</b>
              <span>Analyze gym activity</span>
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}


/* =========================
   MODAL
========================= */

function Modal({
  title,
  onClose,
  children
}) {

  return (
    <div className="modal-backdrop">

      <div className="modal">

        <div className="modal-head">

          <h2>{title}</h2>

          <button
            className="close"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        {children}

      </div>

    </div>
  );
}


/* =========================
   MEMBERS
========================= */

function Members({
  members,
  setMembers,
  plans,
  payments,
  setPayments
}) {

  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(null);
  const [renewMember, setRenewMember] = useState(null);

  const filtered = members.filter(m =>
    (
      m.name +
      " " +
      m.email +
      " " +
      m.plan
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const remove = id => {

    if (confirm("Delete this member?")) {

      setMembers(
        members.filter(
          m => m.id !== id
        )
      );

    }
  };

  return (
    <section>

      <div className="page-actions">

        <div>
          <h2>Member Directory</h2>

          <p className="muted">
            Manage registrations, plans and member status.
          </p>
        </div>

        <button
          className="btn primary"
          onClick={() => {
            setEdit(null);
            setShow(true);
          }}
        >
          + Add Member
        </button>

      </div>

      <div className="toolbar">

        <input
          data-testid="member-search"
          value={search}
          onChange={e =>
            setSearch(e.target.value)
          }
          placeholder="Search by name, email or plan..."
        />

        <span>
          {filtered.length} members
        </span>

      </div>

      <div className="table-panel">

        <table>

          <thead>

            <tr>
              <th>Member</th>
              <th>Phone</th>
              <th>Plan</th>
              <th>Joined</th>
              <th>Expiry</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {filtered.map(m => (

              <tr key={m.id}>

                <td>

                  <div className="table-person">

                    <span className="avatar small">
                      {m.name[0]}
                    </span>

                    <div>
                      <b>{m.name}</b>
                      <small>{m.email}</small>
                    </div>

                  </div>

                </td>

                <td>{m.phone}</td>

                <td>
                  <span className="plan-tag">
                    {m.plan}
                  </span>
                </td>

                <td>{m.joinDate}</td>

                <td>
                  {m.expiryDate || "Not set"}
                </td>

                <td>

                  <span
                    className={`status ${m.status.toLowerCase()}`}
                  >
                    {m.status}
                  </span>

                </td>

                <td>

                  <button
                    className="icon-btn"
                    onClick={() => {
                      setEdit(m);
                      setShow(true);
                    }}
                  >
                    ✎
                  </button>

                  <button
                    className="btn secondary"
                    onClick={() =>
                      setRenewMember(m)
                    }
                  >
                    Renew
                  </button>

                  <button
                    className="icon-btn danger"
                    onClick={() =>
                      remove(m.id)
                    }
                  >
                    ⌫
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {!filtered.length && (
          <div className="empty">
            No members found.
          </div>
        )}

      </div>

      {show && (
        <MemberForm
          initial={edit}
          onClose={() =>
            setShow(false)
          }
          onSave={m => {

            setMembers(
              edit
                ? members.map(
                    x =>
                      x.id === m.id
                        ? m
                        : x
                  )
                : [
                    ...members,
                    {
                      ...m,
                      id: Date.now()
                    }
                  ]
            );

            setShow(false);

          }}
        />
      )}

      {renewMember && (
        <RenewalForm
          member={renewMember}
          plans={plans}
          onClose={() =>
            setRenewMember(null)
          }
          onSave={({
            member,
            amount,
            date,
            method
          }) => {

            setMembers(
              members.map(m =>
                m.id === member.id
                  ? member
                  : m
              )
            );

            setPayments([
              ...payments,
              {
                id: Date.now(),
                member: member.name,
                amount,
                date,
                method,
                status: "Paid"
              }
            ]);

            setRenewMember(null);

          }}
        />
      )}

    </section>
  );
}


/* =========================
   MEMBER FORM
========================= */

function MemberForm({
  initial,
  onClose,
  onSave
}) {

  const [f, setF] = useState(
    initial || {
      name: "",
      email: "",
      phone: "",
      plan: "Basic",
      joinDate: "2026-10-01",
      expiryDate: "2026-11-01",
      status: "Active"
    }
  );

  const change = e =>
    setF({
      ...f,
      [e.target.name]: e.target.value
    });

  return (
    <Modal
      title={
        initial
          ? "Edit Member"
          : "Add New Member"
      }
      onClose={onClose}
    >

      <form
        onSubmit={e => {
          e.preventDefault();
          onSave(f);
        }}
        className="form-grid"
      >

        <label>
          Full Name
          <input
            name="name"
            value={f.name}
            onChange={change}
            required
            minLength="3"
          />
        </label>

        <label>
          Email
          <input
            name="email"
            type="email"
            value={f.email}
            onChange={change}
            required
          />
        </label>

        <label>
          Phone
          <input
            name="phone"
            pattern="[0-9]{10}"
            value={f.phone}
            onChange={change}
            required
          />
        </label>

        <label>
          Plan
          <select
            name="plan"
            value={f.plan}
            onChange={change}
          >
            <option>Basic</option>
            <option>Standard</option>
            <option>Premium</option>
          </select>
        </label>

        <label>
          Join Date
          <input
            name="joinDate"
            type="date"
            value={f.joinDate}
            onChange={change}
            required
          />
        </label>

        <label>
          Expiry Date
          <input
            name="expiryDate"
            type="date"
            value={f.expiryDate || ""}
            onChange={change}
            required
          />
        </label>

        <label>
          Status
          <select
            name="status"
            value={f.status}
            onChange={change}
          >
            <option>Active</option>
            <option>Expired</option>
          </select>
        </label>

        <div className="form-actions">

          <button
            type="button"
            className="btn secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn primary"
            type="submit"
          >
            {initial
              ? "Save Changes"
              : "Add Member"}
          </button>

        </div>

      </form>

    </Modal>
  );
}


/* =========================
   MEMBERSHIP RENEWAL
========================= */

function RenewalForm({ member, plans, onClose, onSave }) {
  const currentPlan =
    plans.find((p) => p.name === member.plan) || plans[0];

  const [plan, setPlan] = useState(currentPlan?.name || "");
  const [date, setDate] = useState("2026-10-01");
  const [method, setMethod] = useState("UPI");

  const selectedPlan =
    plans.find((p) => p.name === plan) || currentPlan;

  const calculateExpiry = () => {
    // Prevent Invalid Date error when the renewal date is empty
    if (!date) return "";

    const newDate = new Date(date);

    const duration = selectedPlan?.duration || "1 Month";

    const months =
      duration === "1 Month"
        ? 1
        : duration === "3 Months"
        ? 3
        : duration === "6 Months"
        ? 6
        : duration === "12 Months"
        ? 12
        : 1;

    newDate.setMonth(newDate.getMonth() + months);

    return newDate.toISOString().split("T")[0];
  };

  const submit = (e) => {
    e.preventDefault();

    const expiryDate = calculateExpiry();

    const updatedMember = {
      ...member,
      plan: selectedPlan.name,
      status: "Active",
      expiryDate: expiryDate
    };

    onSave({
      member: updatedMember,
      amount: Number(selectedPlan.price),
      date: date,
      method: method
    });
  };

  return (
    <Modal
      title="Renew Membership"
      onClose={onClose}
    >
      <form
        className="form-grid"
        onSubmit={submit}
      >
        {/* Member */}
        <label>
          Member
          <input
            value={member.name}
            disabled
          />
        </label>

        {/* Membership Plan */}
        <label>
          Membership Plan
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            required
          >
            {plans.map((p) => (
              <option
                key={p.id}
                value={p.name}
              >
                {p.name}
              </option>
            ))}
          </select>
        </label>

        {/* Renewal Date */}
        <label>
          Renewal Date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>

        {/* Renewal Amount */}
        <label>
          Renewal Amount
          <input
            type="number"
            value={selectedPlan?.price || ""}
            disabled
          />
        </label>

        {/* Payment Method */}
        <label>
          Payment Method
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option>UPI</option>
            <option>Card</option>
            <option>Cash</option>
            <option>Bank Transfer</option>
          </select>
        </label>

        {/* New Expiry Date */}
        <label>
          New Expiry Date
          <input
            value={calculateExpiry()}
            disabled
          />
        </label>

        {/* Buttons */}
        <div className="form-actions">
          <button
            type="button"
            className="btn secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn primary"
            type="submit"
          >
            Renew Membership
          </button>
        </div>
      </form>
    </Modal>
  );
}
/* =========================
   PLANS
========================= */

function Plans({
  plans,
  setPlans
}) {

  const [show, setShow] =
    useState(false);

  const [edit, setEdit] =
    useState(null);

  const remove = id => {

    if (confirm("Delete this plan?")) {
      setPlans(
        plans.filter(
          p => p.id !== id
        )
      );
    }
  };

  return (
    <section>

      <div className="page-actions">

        <div>
          <h2>Membership Plans</h2>

          <p className="muted">
            Create and manage pricing packages.
          </p>
        </div>

        <button
          className="btn primary"
          onClick={() => {
            setEdit(null);
            setShow(true);
          }}
        >
          + Add Plan
        </button>

      </div>

      <div className="plan-grid">

        {plans.map(p => (

          <div
            className="plan-card"
            key={p.id}
          >

            <span className="plan-icon">
              ▣
            </span>

            <h3>{p.name}</h3>

            <div className="price">
              ₹{Number(p.price).toLocaleString()}
              <small>
                {" "} / {p.duration}
              </small>
            </div>

            <p>{p.features}</p>

            <div className="plan-actions">

              <button
                onClick={() => {
                  setEdit(p);
                  setShow(true);
                }}
              >
                Edit
              </button>

              <button
                className="danger-text"
                onClick={() => remove(p.id)}
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

      {show && (
        <PlanForm
          initial={edit}
          onClose={() =>
            setShow(false)
          }
          onSave={p => {

            setPlans(
              edit
                ? plans.map(
                    x =>
                      x.id === p.id
                        ? p
                        : x
                  )
                : [
                    ...plans,
                    {
                      ...p,
                      id: Date.now()
                    }
                  ]
            );

            setShow(false);
          }}
        />
      )}

    </section>
  );
}

function PlanForm({
  initial,
  onClose,
  onSave
}) {

  const [f, setF] =
    useState(
      initial || {
        name: "",
        duration: "1 Month",
        price: "",
        features: ""
      }
    );

  return (
    <Modal
      title={
        initial
          ? "Edit Plan"
          : "Add Plan"
      }
      onClose={onClose}
    >

      <form
        className="form-grid"
        onSubmit={e => {
          e.preventDefault();

          onSave({
            ...f,
            price: Number(f.price)
          });
        }}
      >

        <label>
          Plan Name

          <input
            required
            name="name"
            value={f.name}
            onChange={e =>
              setF({
                ...f,
                name: e.target.value
              })
            }
          />
        </label>

        <label>
          Duration

          <select
            name="duration"
            value={f.duration}
            onChange={e =>
              setF({
                ...f,
                duration: e.target.value
              })
            }
          >
            <option>1 Month</option>
            <option>3 Months</option>
            <option>6 Months</option>
            <option>12 Months</option>
          </select>
        </label>

        <label>
          Price

          <input
            required
            min="1"
            type="number"
            value={f.price}
            onChange={e =>
              setF({
                ...f,
                price: e.target.value
              })
            }
          />
        </label>

        <label>
          Features

          <input
            required
            value={f.features}
            onChange={e =>
              setF({
                ...f,
                features: e.target.value
              })
            }
          />
        </label>

        <div className="form-actions">

          <button
            type="button"
            className="btn secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn primary"
          >
            Save Plan
          </button>

        </div>

      </form>

    </Modal>
  );
}


/* =========================
   PAYMENTS
========================= */

function Payments({
  payments,
  setPayments,
  members
}) {

  const [show, setShow] =
    useState(false);

  const [filter, setFilter] =
    useState("");

  const list = payments.filter(p =>
    (
      p.member +
      " " +
      p.method +
      " " +
      p.status
    )
      .toLowerCase()
      .includes(
        filter.toLowerCase()
      )
  );

  return (
    <section>

      <div className="page-actions">

        <div>
          <h2>Payments</h2>

          <p className="muted">
            Track membership payments and pending dues.
          </p>
        </div>

        <button
          className="btn primary"
          onClick={() =>
            setShow(true)
          }
        >
          + Record Payment
        </button>

      </div>

      <div className="toolbar">

        <input
          data-testid="payment-search"
          value={filter}
          onChange={e =>
            setFilter(e.target.value)
          }
          placeholder="Search payments..."
        />

        <span>
          {list.length} transactions
        </span>

      </div>

      <div className="table-panel">

        <table>

          <thead>
            <tr>
              <th>Member</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Method</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>

            {list.map(p => (

              <tr key={p.id}>

                <td>
                  <b>{p.member}</b>
                </td>

                <td>
                  <b>
                    ₹{Number(
                      p.amount
                    ).toLocaleString()}
                  </b>
                </td>

                <td>{p.date}</td>

                <td>{p.method}</td>

                <td>
                  <span
                    className={`status ${p.status.toLowerCase()}`}
                  >
                    {p.status}
                  </span>
                </td>

                <td>

                  <button
                    className="icon-btn danger"
                    onClick={() =>
                      setPayments(
                        payments.filter(
                          x =>
                            x.id !== p.id
                        )
                      )
                    }
                  >
                    ⌫
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {show && (
        <PaymentForm
          members={members}
          onClose={() =>
            setShow(false)
          }
          onSave={p => {

            setPayments([
              ...payments,
              {
                ...p,
                id: Date.now()
              }
            ]);

            setShow(false);
          }}
        />
      )}

    </section>
  );
}

function PaymentForm({
  members,
  onClose,
  onSave
}) {

  const [f, setF] =
    useState({
      member:
        members[0]?.name || "",
      amount: "",
      date: "2026-10-01",
      method: "UPI",
      status: "Paid"
    });

  return (
    <Modal
      title="Record Payment"
      onClose={onClose}
    >

      <form
        className="form-grid"
        onSubmit={e => {
          e.preventDefault();

          onSave({
            ...f,
            amount: Number(f.amount)
          });
        }}
      >

        <label>
          Member

          <select
            value={f.member}
            onChange={e =>
              setF({
                ...f,
                member: e.target.value
              })
            }
          >

            {members.map(m => (
              <option key={m.id}>
                {m.name}
              </option>
            ))}

          </select>
        </label>

        <label>
          Amount

          <input
            required
            min="1"
            type="number"
            value={f.amount}
            onChange={e =>
              setF({
                ...f,
                amount: e.target.value
              })
            }
          />
        </label>

        <label>
          Date

          <input
            required
            type="date"
            value={f.date}
            onChange={e =>
              setF({
                ...f,
                date: e.target.value
              })
            }
          />
        </label>

        <label>
          Method

          <select
            value={f.method}
            onChange={e =>
              setF({
                ...f,
                method: e.target.value
              })
            }
          >
            <option>UPI</option>
            <option>Card</option>
            <option>Cash</option>
            <option>Bank Transfer</option>
          </select>
        </label>

        <label>
          Status

          <select
            value={f.status}
            onChange={e =>
              setF({
                ...f,
                status: e.target.value
              })
            }
          >
            <option>Paid</option>
            <option>Pending</option>
          </select>
        </label>

        <div className="form-actions">

          <button
            type="button"
            className="btn secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn primary"
          >
            Save Payment
          </button>

        </div>

      </form>

    </Modal>
  );
}


/* =========================
   ATTENDANCE
========================= */

function Attendance({
  attendance,
  setAttendance,
  members
}) {

  const [date, setDate] =
    useState("2026-09-30");

  const [show, setShow] =
    useState(false);

  const list =
    attendance.filter(
      a => a.date === date
    );

  return (
    <section>

      <div className="page-actions">

        <div>
          <h2>Attendance</h2>

          <p className="muted">
            Track daily gym check-ins.
          </p>
        </div>

        <button
          className="btn primary"
          onClick={() =>
            setShow(true)
          }
        >
          + Mark Attendance
        </button>

      </div>

      <div className="toolbar">

        <input
          type="date"
          value={date}
          onChange={e =>
            setDate(e.target.value)
          }
        />

        <span>
          {list.length} check-ins
        </span>

      </div>

      <div className="table-panel">

        <table>

          <thead>

            <tr>
              <th>Member</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th></th>
            </tr>

          </thead>

          <tbody>

            {list.map(a => (

              <tr key={a.id}>

                <td>
                  <b>{a.member}</b>
                </td>

                <td>{a.date}</td>

                <td>{a.time}</td>

                <td>
                  <span className="status active">
                    {a.status}
                  </span>
                </td>

                <td>

                  <button
                    className="icon-btn danger"
                    onClick={() =>
                      setAttendance(
                        attendance.filter(
                          x =>
                            x.id !== a.id
                        )
                      )
                    }
                  >
                    ⌫
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {!list.length && (
          <div className="empty">
            No attendance for this date.
          </div>
        )}

      </div>

      {show && (
        <AttendanceForm
          members={members}
          date={date}
          onClose={() =>
            setShow(false)
          }
          onSave={a => {

            setAttendance([
              ...attendance,
              {
                ...a,
                id: Date.now()
              }
            ]);

            setShow(false);
          }}
        />
      )}

    </section>
  );
}

function AttendanceForm({
  members,
  date,
  onClose,
  onSave
}) {

  const [f, setF] =
    useState({
      member:
        members[0]?.name || "",
      date,
      time: "08:00",
      status: "Present"
    });

  return (
    <Modal
      title="Mark Attendance"
      onClose={onClose}
    >

      <form
        className="form-grid"
        onSubmit={e => {
          e.preventDefault();
          onSave(f);
        }}
      >

        <label>
          Member

          <select
            value={f.member}
            onChange={e =>
              setF({
                ...f,
                member: e.target.value
              })
            }
          >

            {members
              .filter(
                m => m.status === "Active"
              )
              .map(m => (
                <option key={m.id}>
                  {m.name}
                </option>
              ))}

          </select>

        </label>

        <label>
          Date

          <input
            type="date"
            required
            value={f.date}
            onChange={e =>
              setF({
                ...f,
                date: e.target.value
              })
            }
          />
        </label>

        <label>
          Check-in Time

          <input
            type="time"
            required
            value={f.time}
            onChange={e =>
              setF({
                ...f,
                time: e.target.value
              })
            }
          />
        </label>

        <div className="form-actions">

          <button
            type="button"
            className="btn secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button className="btn primary">
            Mark Present
          </button>

        </div>

      </form>

    </Modal>
  );
}


/* =========================
   REPORTS
========================= */

function Reports({
  members,
  payments,
  attendance
}) {

  const paid =
    payments.filter(
      p => p.status === "Paid"
    );

  const revenue =
    paid.reduce(
      (a, p) =>
        a + Number(p.amount),
      0
    );

  const active =
    members.filter(
      m => m.status === "Active"
    ).length;

  return (
    <section>

      <div className="page-actions">

        <div>
          <h2>Reports & Analytics</h2>

          <p className="muted">
            A simple overview of gym performance.
          </p>
        </div>

        <button
          className="btn secondary"
          onClick={() =>
            window.print()
          }
        >
          Print Report
        </button>

      </div>

      <div className="report-grid">

        <div className="report-card">
          <span>Total Revenue</span>
          <strong>
            ₹{revenue.toLocaleString()}
          </strong>
          <small>
            {paid.length} paid transactions
          </small>
        </div>

        <div className="report-card">
          <span>Active Members</span>
          <strong>{active}</strong>
          <small>
            of {members.length} total members
          </small>
        </div>

        <div className="report-card">
          <span>Attendance Records</span>
          <strong>
            {attendance.length}
          </strong>
          <small>
            Total check-ins
          </small>
        </div>

      </div>

      <div className="panel report-summary">

        <h3>
          Membership Summary
        </h3>

        {["Basic", "Standard", "Premium"].map(
          plan => (

            <div
              className="bar-row"
              key={plan}
            >

              <span>{plan}</span>

              <div className="bar">

                <i
                  style={{
                    width: `${
                      Math.max(
                        8,
                        members.filter(
                          m =>
                            m.plan === plan
                        ).length /
                          members.length *
                          100
                      )
                    }%`
                  }}
                />

              </div>

              <b>
                {
                  members.filter(
                    m => m.plan === plan
                  ).length
                }
              </b>

            </div>

          )
        )}

      </div>

    </section>
  );
}


createRoot(
  document.getElementById("root")
).render(<App />);