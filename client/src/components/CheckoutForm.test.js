import React from "react";
import { render, fireEvent, getByLabelText, waitFor } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    const { getByText } = render(<CheckoutForm />);

    const header = getByText(/Checkout Form/i);

    expect(header).toBeInTheDocument();
});

test("form shows success message on submit with form details", async () => {
    const { getByText, getByLabelText, getByTestId } = render(<CheckoutForm />);

    const firstNameInput = getByLabelText(/first name/i);
    const lastNameInput = getByLabelText(/last name/i);
    const addressInput = getByLabelText(/address/i);
    const cityInput = getByLabelText(/city/i);
    const stateInput = getByLabelText(/state/i);
    const zipInput = getByLabelText(/zip/i);
    const checkoutButton = getByTestId(/checkout/i);

    fireEvent.change(firstNameInput, { target: { value: 'Shayne' } });
    fireEvent.change(lastNameInput, { target: { value: 'Smith' } });
    fireEvent.change(addressInput, { target: { value: '9004 Waltlee Road' } });
    fireEvent.change(cityInput, { target: { value: 'Louisville' } });
    fireEvent.change(stateInput, { target: { value: 'KY' } });
    fireEvent.change(zipInput, { target: { value: '40291' } });
    fireEvent.click(checkoutButton);

    await waitFor(() => {
        const successMessage = getByText(/You have ordered some plants!/i);
        expect(successMessage).toBeInTheDocument();
    });
});
