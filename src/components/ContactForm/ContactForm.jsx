import { useState } from "react";
import { nanoid } from "nanoid";
import css from "./ContactForm.module.css";
import PropTypes from "prop-types";

export const ContactForm = ({ addContact, contacts }) => {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");

    const nameChangeEvent = e => {
        setName(e.target.value);
    };

    const numberChangeEvent = e => {
        setNumber(e.target.value);
    };

    const addContactSubmit = e => {
        //prevent the form from refreshing upon submit
        e.preventDefault();

        //if name and number is empty, will not submit(return)
        if (name.trim() === "" || number.trim() === "") {
            return;
        }

        //if contact exist, set an alert, will not submit(return)
        const existingContact = contacts.find(
            contact => contact.name.toLowerCase() === name.toLowerCase());
        
            if (existingContact) {
                alert(`${name} is already in contacts!`);
                return;
            }

            //adding contact
            addContact({
                id: nanoid(),
                name: name.trim(),
                number: number.trim(),
            });
            
            //Reset form fields upon submit
            setName("");
            setNumber("");
    };

    return (
        <form className={css.form} onSubmit={addContactSubmit}>
            <label className={css.formField}>
                <p className={css.nameLabel}>Name</p>
                <input 
                    type="text"
                    name="name"
                    placeholder="Name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
                    required
                    value={name}
                    onChange={nameChangeEvent}
                    />
            </label>

            <label className={css.formField}>
                <p className={css.nameLabel}>Number</p>
                <input 
                    type="tel"
                    name="number"
                    placeholder="Number"
                    pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    value={number}
                    onChange={numberChangeEvent}
                    />
            </label>

            <button className={css.addContactButton} type="submit">Add Contact
            </button>
        </form>
    );
}; 

ContactForm.propTypes = {
    addContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })
    ),
};