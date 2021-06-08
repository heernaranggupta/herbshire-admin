import { Box, Flex, Text, Center, Grid, Divider } from "@chakra-ui/layout";
import { TagLabel, Tag, TagCloseButton } from "@chakra-ui/tag";
import { useToast } from "@chakra-ui/toast";
import { Textarea } from "@chakra-ui/textarea";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { SERVER_URL } from "../Config/Apis";
import { Context } from "../Data/Context";
import FormInput from "../Views/FormInput";
import Select from "react-select";

const UpdateSubscription = () => {
  const { id } = useParams();
  const { auth } = useContext(Context);
  const form = useRef();
  const [image, setImage] = useState([]);
  const [editSubDetail, setEditSubDetail] = useState([]);
  const [editName, setEditName] = useState();
  const [editStatus, setEditStatus] = useState();
  const [editDescription, setEditDescription] = useState("");
  const toast = useToast();

  const statusList = [
    { value: 1, label: "Active" },
    { value: 2, label: "Inavtive" },
  ];
  const productsList = [];

  const uptoList = [{ value: 1, label: "ONE_MONTH" }];
  const frequencyList = [];
  const delivery_days = [];

  const toastMessage = (status, msg) => {
    toast({
      description: msg,
      status: status,
      duration: 9000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  useEffect(() => {
    const url = SERVER_URL + "subscription";
    const config = {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
      params: {
        id: id,
      },
    };
    axios
      .get(url, config)
      .then(function (response) {
        console.log(response);
        setEditSubDetail(response.data.body);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [auth]);

  const add_media = (event) => {
    event.preventDefault();
    const files = event.target.files;
    const tempImages = [...image];

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      let duplicate = false;
      if (!duplicate) tempImages.push(file);
    }
    setImage([...tempImages]);
    console.log("Add media", tempImages);
    return;
  };

  const removeImage = (id) => {
    const tempImages = image;
    const deletedImage = tempImages.splice(id, 1);
    toastMessage("warning", `${deletedImage[0].name} deleted !`);
    setImage([...tempImages]);
  };

  const SelectedImage = (
    <Flex display="block">
      {image.map((img, key) => (
        <Tag
          size="lg"
          h="50px"
          key={key}
          borderRadius="10px"
          variant="solid"
          colorScheme="green"
          m="2"
        >
          <TagLabel>{img.name}</TagLabel>
          <TagCloseButton onClick={() => removeImage(key)} />
        </Tag>
      ))}
    </Flex>
  );

  return (
    <Box>
      <Text m="2" fontSize="lg" fontWeight="semibold">
        Edit Subscription
      </Text>
      <Box
        w="100%"
        p="4"
        borderWidth="thin"
        borderRadius="5"
        borderColor="blackAlpha.300"
      >
        <form ref={form} encType="multipart/form-data">
          <Flex>
            <FormInput
              label="Name Of Subscription"
              type="text"
              value={editName}
              onChange={(e) =>
                setEditName({ ...editSubDetail, name: e.target.value })
              }
            />
            
            <Box m="3">
              <Text
                m="2"
                fontSize="md"
                fontWeight="semibold"
                color="blackAlpha.800"
              >
                Availability Status
              </Text>
              <div style={{ fontSize: "1.1rem", width: "10rem" }}>
                <Select
                  name="status"
                  placeholder={editSubDetail.active ? "Active" : "Inactive"}
                  options={statusList}
                  onChange={(e) =>
                    e.label === "Active"
                      ? setEditStatus({ ...editSubDetail, active: true })
                      : setEditStatus({ ...editSubDetail, active: false })
                  }
                />
              </div>
            </Box>
          </Flex>
          <Grid m="2">
            <Text
              m="2"
              fontSize="md"
              fontWeight="semibold"
              color="blackAlpha.800"
            >
              Description
            </Text>
            <Textarea
              mb="3"
              value={editSubDetail.description}
              onChange={(e) =>
                setEditDescription({
                  ...editSubDetail,
                  description: e.target.value,
                })
              }
            />
          </Grid>

          <Flex>
            <Box m="2">
              <Text
                m="2"
                fontSize="md"
                fontWeight="semibold"
                color="blackAlpha.800"
              >
                Select subscription image
              </Text>
              <Flex
                w="300px"
                borderRadius="5"
                borderWidth="thin"
                borderColor="blackAlpha.200"
              >
                <Center>
                  <Input
                    placeholder="Image"
                    type="file"
                    opacity="0"
                    w="300px"
                    mt="3"
                    borderWidth="thin"
                    borderColor="blackAlpha.200"
                    accept="images/*"
                    multiple
                    onChange={add_media}
                  />

                  <Text
                    position="absolute"
                    zIndex="-1"
                    fontSize="lg"
                    color="blackAlpha.500"
                  >
                    Drag &amp; Drop/Click Here
                  </Text>
                </Center>
              </Flex>
              {SelectedImage}
            </Box>
            <Box m="3">
              <Text
                m="2"
                fontSize="md"
                fontWeight="semibold"
                color="blackAlpha.800"
              >
                List of Product
              </Text>
              <div style={{ fontSize: "1.3rem", width: "15rem" }}>
                <Select isMulti options={productsList} name="product" />
              </div>
            </Box>
          </Flex>
          <Text mb="4">Subscription Price</Text>
          <Divider mt="4" mb="4" />
          <Flex>
            <FormInput label="Price" type="text" name="price" />
            <Box m="3">
              <Text
                m="2"
                fontSize="md"
                fontWeight="semibold"
                color="blackAlpha.800"
              >
                Frequency
              </Text>
              <div style={{ fontSize: "1.3rem", width: "16rem" }}>
                <Select isMulti options={frequencyList} name="frequency" />
              </div>
            </Box>
            <Box m="3">
              <Text
                m="2"
                fontSize="md"
                fontWeight="semibold"
                color="blackAlpha.800"
              >
                Up To
              </Text>
              <div style={{ fontSize: "1.3rem", width: "15rem" }}>
                <Select placeholder="Select Option" options={uptoList} />
              </div>
            </Box>
            <Box m="3">
              <Text
                m="2"
                fontSize="md"
                fontWeight="semibold"
                color="blackAlpha.800"
              >
                Delivery Days
              </Text>
              <div style={{ fontSize: "1.3rem", width: "13rem" }}>
                <Select isMulti options={delivery_days} name="deliveryDays" />
              </div>
            </Box>
          </Flex>

          <Button type="submit">Add New Subscription</Button>
        </form>
      </Box>
    </Box>
  );
};

export default UpdateSubscription;