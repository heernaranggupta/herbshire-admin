import "./sidenav.css";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Flex } from "@chakra-ui/layout";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import React, { useContext } from "react";
import { TiThMenu } from "react-icons/ti";
import { Center } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import logo from "../../Logo.png";
import { MdDashboard } from "react-icons/md";
import { GrCube, GrDeliver } from "react-icons/gr";
import { FaCube, FaRegUser, FaShoppingCart } from "react-icons/fa";
import { Context } from "../Data/Context";
import { NavLink } from "react-router-dom";

export default function NavForMobile() {
  const { auth, selectedNavItem, setSelectedNavItem } = useContext(Context);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const onClickNavItem = (item) => {
    setSelectedNavItem(item);
    onClose();
  };

  let DrawerMenuBody = "";
  if (!auth) {
    DrawerMenuBody = (
      <DrawerBody p="0">
        <NavLink to="/">
          <Flex h="14" pl="75px" bgGradient="linear(to-r, #5bf5e3, #ffffff00)">
            <Center h="14">
              <MdDashboard />{" "}
              <Text fontSize="larger" ml="4">
                Login
              </Text>
            </Center>
          </Flex>
        </NavLink>
      </DrawerBody>
    );
  } else {
    DrawerMenuBody = (
      <DrawerBody p="0">
        <NavLink to="/">
          <Flex
            h="14"
            pl="75px"
            bgGradient={
              selectedNavItem === "dashboard"
                ? "linear(to-r, #5bf5e3, #ffffff00)"
                : "linear(to-r, #fffff00, #ffffff00)"
            }
            onClick={() => onClickNavItem("dashboard")}
          >
            <Center h="14">
              <MdDashboard />{" "}
              <Text fontSize="larger" ml="4">
                Dashboard
              </Text>
            </Center>
          </Flex>
        </NavLink>

        <NavLink to="/orders">
          <Flex
            h="14"
            pl="75px"
            bgGradient={
              selectedNavItem === "orders"
                ? "linear(to-r, #5bf5e3, #ffffff00)"
                : "linear(to-r, #fffff00, #ffffff00)"
            }
            onClick={() => onClickNavItem("orders")}
          >
            <Center h="14">
              <GrCube />{" "}
              <Text fontSize="larger" ml="4">
                {" "}
                Orders
              </Text>
            </Center>
          </Flex>
        </NavLink>
        <NavLink to="/recipe">
          <Flex
            h="14"
            pl="75px"
            bgGradient={
              selectedNavItem === "recipe"
                ? "linear(to-r, #5bf5e3, #ffffff00)"
                : "linear(to-r, #fffff00, #ffffff00)"
            }
            onClick={() => onClickNavItem("recipe")}
          >
            <Center h="14">
              <GrCube />{" "}
              <Text fontSize="larger" ml="4">
                {" "}
                Recipe
              </Text>
            </Center>
          </Flex>
        </NavLink>
        <NavLink to="/subscription">
          <Flex
            h="14"
            pl="75px"
            bgGradient={
              selectedNavItem === "subscription"
                ? "linear(to-r, #5bf5e3, #ffffff00)"
                : "linear(to-r, #fffff00, #ffffff00)"
            }
            onClick={() => onClickNavItem("subscription")}
          >
            <Center h="14">
              <FaCube />{" "}
              <Text fontSize="larger" ml="4">
                {" "}
                Subscription
              </Text>
            </Center>
          </Flex>
        </NavLink>
        <NavLink to="/deliveries">
          <Flex
            h="14"
            pl="75px"
            bgGradient={
              selectedNavItem === "deliveries"
                ? "linear(to-r, #5bf5e3, #ffffff00)"
                : "linear(to-r, #fffff00, #ffffff00)"
            }
            onClick={() => onClickNavItem("deliveries")}
          >
            <Center h="14">
              <GrDeliver />{" "}
              <Text fontSize="larger" ml="4">
                {" "}
                Deliveries
              </Text>
            </Center>
          </Flex>
        </NavLink>
        <NavLink to="/customers">
          <Flex
            h="14"
            pl="75px"
            bgGradient={
              selectedNavItem === "customers"
                ? "linear(to-r, #5bf5e3, #ffffff00)"
                : "linear(to-r, #fffff00, #ffffff00)"
            }
            onClick={() => onClickNavItem("customers")}
          >
            <Center h="14">
              <FaRegUser />{" "}
              <Text fontSize="larger" ml="4">
                {" "}
                Customers
              </Text>
            </Center>
          </Flex>
        </NavLink>
        <NavLink to="/products">
          <Flex
            h="14"
            pl="75px"
            bgGradient={
              selectedNavItem === "products"
                ? "linear(to-r, #5bf5e3, #ffffff00)"
                : "linear(to-r, #fffff00, #ffffff00)"
            }
            onClick={() => onClickNavItem("products")}
          >
            <Center h="14">
              <FaShoppingCart />{" "}
              <Text fontSize="larger" ml="4">
                {" "}
                Products
              </Text>
            </Center>
          </Flex>
        </NavLink>
      </DrawerBody>
    );
  }

  return (
    <>
      <Button onClick={onOpen} bg="green.500">
        <TiThMenu className="nav-icon-color" />
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent
            bg="#ffffff"
            bgGradient="linear(to-b, #bffcf4, #ffffff00)"
          >
            <DrawerHeader>
              <Flex>
                <img src={logo} alt="logo" />
                <Text fontSize="larger" ml="2" mt="2">
                  HerbShire
                </Text>
              </Flex>
            </DrawerHeader>

            {DrawerMenuBody}

            <DrawerFooter>
              {/* <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button> */}
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
