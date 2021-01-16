import React, { useState } from "react";
import { Button, Icon, Modal, Message } from "semantic-ui-react";
import RegistrationForm from "./RegistrationForm";
import PaymentForm from "./PaymentForm";
import { performAuthentication } from "../modules/auth";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
	"pk_test_51HuxhoEDdj3L9cb7mRwXVf3mjnVY7dk7NL7WmIZ31HGjkKHk9RSQASdCWIXiObHTiyfYkNhxKFsvLFkvLKyxM6Wz004BVP7pWj"
);

const MasterModal = () => {
	const dispatch = useDispatch();
	const { errorMessage, authenticated, currentUser } = useSelector(
		state => state
	);
	const [firstOpen, setFirstOpen] = useState(false);
	const [secondOpen, setSecondOpen] = useState(false);

	const registerAndProceed = e => {
		e.preventDefault();
		performAuthentication(e, dispatch);
		setSecondOpen(authenticated);
	};

	const finalizePayment = () => {
		setSecondOpen(false);
		setFirstOpen(false);
	};

	return (
		<>
			<Button onClick={() => setFirstOpen(true)} data-cy="register-btn">
				Register To View Premium Content
			</Button>
			<Modal
				onClose={() => setFirstOpen(false)}
				onOpen={() => setFirstOpen(true)}
				open={firstOpen}
				data-cy="first-registration"
			>
				<Modal.Header>Enter Your Details</Modal.Header>
				<Modal.Content>
					<RegistrationForm
						data-cy="registration-form"
						registerAndProceed={registerAndProceed}
					/>
					<Modal.Description>
						{errorMessage && (
							<Message color="red" data-cy="error-message">
								{errorMessage}
							</Message>
						)}
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button
						type="submit"
						form="registrationForm"
						data-cy="submit-btn"
						primary
					>
						Proceed to Payment <Icon name="right chevron" />
					</Button>
				</Modal.Actions>

				<Modal
					onClose={() => setSecondOpen(false)}
					open={secondOpen}
					size="medium"
					data-cy="payment-details"
				>
					<Modal.Header data-cy="header-user-email">
						<Message>Logged in as {currentUser.email}</Message>
					</Modal.Header>
					<Modal.Header>Enter Card Details</Modal.Header>
					<Modal.Content>
						<Elements stripe={stripePromise}>
							<PaymentForm
								data-cy="payment-form"
							/>
						</Elements>
					</Modal.Content>
					<Modal.Actions>
						<Button
							icon="check"
							content="All Done"
							data-cy="all-done"
							onClick={finalizePayment}
							primary
						/>
					</Modal.Actions>
				</Modal>
			</Modal>
		</>
	);
};

export default MasterModal;
