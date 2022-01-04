import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

import useRequest from '../../hooks/use-request';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { errorNode, doRequest } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      method: order.id,
    },
    onSuccess: (payment) => console.log({ payment }),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order expired</div>;
  }

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      <br />
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51K8STPI8F3dk92zE9LrtcpWotfGWAUeLF3cAqAEgKsjzCRSWbLtxFu0xwsfKLtrDP88BXnYtBER6JMtRxEpEO0lw00MfofywPP"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errorNode}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
