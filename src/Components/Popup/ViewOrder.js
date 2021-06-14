import React, { useContext, useState } from "react";
import { Context } from "../Data/Context";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Grid,
  Box,
  Text,
  Table,
  Tr,
  Th,
  Td,
  Tbody,
  Thead,
} from "@chakra-ui/react";

const ViewOrder = (props) => {
  const { viewOrder, setviewOrder } = useContext(Context);
  const handleClose = () => setviewOrder(false);

  console.log(props.add, "view order");

  return (
    <>
      <Modal isOpen={viewOrder} onClose={handleClose} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="#2A9F85" color="#fff">View order</ModalHeader>
          <ModalCloseButton bgColor="#fff" borderRadius="50%" color="#2A9F85"/>
          <ModalBody textAlign="center">
            <Table border="1px solid #e2e8f0">
              <Thead>
                <Tr>
                  <Th>Product Name</Th>
                  <Th>Description</Th>
                  <Th>Quantity</Th>
                  <Th>Price</Th>
                  <Th>Mode Of Payment</Th>
                  <Th>Payment Status</Th>
                  <Th>Delivery Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {props.add < 1
                  ? "No Data found :("
                  : props.add.map((order, index) => {
                      return (
                        <Tr key={index}>
                          {order.ordersDetailsList.map((orderDetail, index) => {
                            return (
                              <>
                                <Td>{orderDetail.product.productName}</Td>
                                <Td>{orderDetail.product.description}</Td>
                                <Td textAlign="center">
                                  {orderDetail.quantity}
                                </Td>
                              </>
                            );
                          })}
                          <Td>₹{order.amount}</Td>
                          <Td>{order.paymentMethod}</Td>
                          <Td>{order.paymentStatus}</Td>
                          <Td>{order.deliveryDate}</Td>
                        </Tr>
                      );
                    })}
              </Tbody>
            </Table>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewOrder;
