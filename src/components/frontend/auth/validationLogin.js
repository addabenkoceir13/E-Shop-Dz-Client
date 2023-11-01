export default function ValidationLogin(values)
{
    const errors = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;

    if (values.email === "") {
        errors.email = 'Email is reqired';
    } else if (!email_pattern.test(values.email)) {
        errors.email = "Email did'ny match";
    }
    if (values.password === "") {
        errors.password = "Password is Required";
    }
}