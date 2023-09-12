import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser, getUser } from "../app/reducers/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const EditUser = () => {

  const [isDisabled, setIsDisabled] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    userRole: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user, isLoading } = useSelector((state) => state.auth);
  const { isError, message, isSuccess } = useSelector((state) => state.users);

  useEffect(() => {
    const fetch = async () => {
      if (isError) {
        toast.error(message);
      }
      if (user) {
        const fetcheduser = await dispatch(getUser(id));
        setFormData(fetcheduser.payload);
      }
    };
    fetch();
  }, [user, dispatch, id, isError]);

  const handleEdit = () => {
    setIsDisabled(!isDisabled);
  };
  const handleChange = (event) => {
    setFormData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    await dispatch(updateUser({ id: formData._id, user: formData }));
    navigate("/users/");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className="user_main">
      <div className="edit_user_container">
        <Form onSubmit={handleUpdate}>
          <Row>
            <Col lg={4}>
                <Form.Label column sm={12}>
                  Full Name
                </Form.Label>


              


                <Form.Label column sm={12} >
                  Username
                </Form.Label>

        


                <Form.Label column sm={12}>
                  Email
                </Form.Label>

            



                <Form.Label column sm={12}>
                  Role
                </Form.Label>
                </Col>

<Col  lg={6} >


           {/* name feild */}
   <Form.Group as={Row} controlId="fullName" className="mb-2">
                
                  <Form.Control
                    disabled={isDisabled}
                    type="text"
                    placeholder=""
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                
              </Form.Group>


               {/* user feild  */}
              <Form.Group as={Row} controlId="userName" className="mb-2">
              
                  <Form.Control
                    disabled={isDisabled}
                    type="text"
                    placeholder=""
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                  />
               
              </Form.Group>

              {/* email feild  */}
              <Form.Group as={Row} controlId="email" className="mb-2">
               
                  <Form.Control
                    disabled={isDisabled}
                    type="email"
                    placeholder=""
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                
              </Form.Group>

                 {/* role feild */}
              <Form.Group as={Row} controlId="userRole" className="mb-2">
                
                  <Form.Select
                    disabled={isDisabled}
                    value={formData.userRole}
                    name="userRole"
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Role
                    </option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="agent">Agent</option>
                  </Form.Select>
                
              </Form.Group>



              <Form.Group as={Row} className="mb-2  " >
                {isDisabled && (
                  <Button
                  className="mb-2 mr-2 edit_user_btn "
                    variant="secondary"
                    type="button"
                    onClick={handleEdit}
                    >
                    Edit
                  </Button>
                )}
                <Button className="mb-2 mr-2 update_user_btn " variant="secondary" type="submit">
                  Update
                </Button>
              </Form.Group>
                </Col>
            
          </Row>
        </Form>
      </div>
    </main>
  );
};

export default EditUser;
