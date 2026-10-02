import { useState } from "react";
import config from "@config/config.json";
import Banner from "./components/Banner";
import { markdownify } from "@lib/utils/textConverter";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, contact_us } = frontmatter;

  const [saveStatus, setSaveStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaveStatus("Saving your information... Please wait a moment.");
    try {
      const formData = event.target;
      const data = {
        name: formData.name.value,
        email: formData.email.value,
        company_name: formData.company_name.value,
        phone: formData.phone.value,
        company_description: formData.company_description.value,
        subject: formData.subject.value,
        message: formData.message.value,
      };
      const JSONdata = JSON.stringify(data);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSONdata,
      };
      const response = await fetch(config.params.contact_form_action, options);

      if (response.statusText === "OK" && response.status === 200) {
        document.getElementById("contact-form").reset();
        setSaveStatus(
          "Your contact information has been successfully saved. We appreciate your inquiry and will be in touch shortly to address your message."
        );
      }
    } catch (e) {
      console.log("failed to save");
      setSaveStatus(
        "Apologies, but due to an error, we were unable to save your contact details. Please try again or contact us directly."
      );
    }
  };

  return (
    <section className="section">
      <Banner title={title} />
      <div className="container md:col-10 lg:col-8">
        <div className="section row items-center justify-center">
          <form
            method="POST"
            onSubmit={handleSubmit}
            id="contact-form"
            className="contact-form rounded-xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.05)]"
          >
            <div className="animate mb-6 text-center">
              <p>{contact_us.subtitle}</p>
              {markdownify(contact_us.title, "h2", "section-title mt-4")}
              {markdownify(contact_us.content, "p", "mt-16")}
            </div>
            <div className="row">
              <div className="mb-6 lg:col-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="form-input w-full"
                  name="name"
                  id="name"
                  placeholder="Full Name"
                  type="text"
                  required
                />
              </div>
              <div className="mb-6 lg:col-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="form-input w-full"
                  name="email"
                  id="email"
                  placeholder="Email Address"
                  type="email"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-6 lg:col-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="company_name"
                >
                  Company Name
                </label>
                <input
                  className="form-input w-full"
                  name="company_name"
                  id="company_name"
                  placeholder="Company Name"
                  type="text"
                  required
                />
              </div>
              <div className="mb-6 lg:col-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  className="form-input w-full"
                  name="phone"
                  id="phone"
                  placeholder="Phone Number"
                  type="tel"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                className="mb-2 block font-medium text-dark"
                htmlFor="description"
              >
                Company Description
              </label>
              <textarea
                className="form-textarea w-full"
                name="company_description"
                id="company_description"
                rows="6"
              />
            </div>
            <div className="mb-6">
              <label
                className="mb-2 block font-medium text-dark"
                htmlFor="subject"
              >
                Subject
              </label>
              <input
                className="form-input w-full"
                name="subject"
                id="subject"
                type="text"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="mb-2 block font-medium text-dark"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="form-textarea w-full"
                name="message"
                id="message"
                rows="6"
                required
              />
            </div>
            <>
              <button className="btn btn-primary block">Submit Now</button>
              <p className="mt-3 block text-gray-500">{saveStatus}</p>
            </>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
