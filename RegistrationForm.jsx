import React, { useState } from "react";

const empty = { name: "", email: "", password: "", age: "", mobile: "", gender: "", state: "" };

// Reusable registration form: controlled inputs + validation + conditional messages
export default function RegistrationForm() {
  const [form, setForm] = useState(empty);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Error message for each field, or "" when the field is valid
  const errors = {
    name: !form.name.trim() ? "Name is required." : !/^[A-Za-z ]+$/.test(form.name.trim()) ? "Name must contain letters and spaces only." : "",
    email: !form.email ? "Email is required." : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? "Enter a valid email address." : "",
    password: !form.password ? "Password is required." : !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(form.password) ? "Use uppercase, lowercase, a number and at least 8 characters." : "",
    age: !form.age ? "Age is required." : Number(form.age) < 18 || Number(form.age) > 30 ? "Age must be between 18 and 30." : "",
    mobile: !form.mobile ? "Mobile number is required." : !/^\d{10}$/.test(form.mobile) ? "Enter exactly 10 digits." : "",
    gender: !form.gender ? "Gender is required." : "",
    state: !form.state ? "State is required." : "",
  };
  const valid = Object.values(errors).every((e) => e === "");

  const update = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); setSubmitted(false); };
  const blur = (e) => setTouched({ ...touched, [e.target.name]: true });
  const submit = (e) => { e.preventDefault(); if (valid) { setSubmitted(true); setForm(empty); setTouched({}); } };

  const field = (name, label, props = {}) => (
    <>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} value={form[name]} onChange={update} onBlur={blur} {...props} />
      {touched[name] && errors[name] && <small>{errors[name]}</small>}
    </>
  );
  const select = (name, label, options) => (
    <>
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} value={form[name]} onChange={update} onBlur={blur}>
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {touched[name] && errors[name] && <small>{errors[name]}</small>}
    </>
  );

  return (
    <form onSubmit={submit} noValidate>
      {field("name", "Full Name", { placeholder: "Enter your name" })}
      {field("email", "Email Address", { type: "email", placeholder: "Enter your email" })}
      {field("password", "Password", { type: "password", placeholder: "Minimum 8 characters" })}
      {field("age", "Age", { type: "number", placeholder: "Enter age (18–30)" })}
      {field("mobile", "Mobile Number", { type: "tel", placeholder: "10-digit mobile number" })}
      {select("gender", "Gender", ["Male", "Female", "Other"])}
      {select("state", "State", ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh"])}
      <button type="submit" disabled={!valid}>Submit Registration</button>
      {submitted && <p className="success">Registration completed successfully!</p>}
    </form>
  );
}
