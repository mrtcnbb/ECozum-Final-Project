import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Text,
  Icon,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Breadcrumb,
  BreadcrumbItem,
  Input,
  Textarea,
  Avatar,
  Checkbox,
  CheckboxGroup,
  Stack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useToast,
} from '@chakra-ui/react';
import { BiCalendar, BiLabel, BiCheckSquare, BiDotsHorizontalRounded, BiX } from 'react-icons/bi';
import React, { FC, useState } from 'react';
import { ChevronRightIcon } from '@chakra-ui/icons';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import CardModalLabel from './CardModalLabel';
import CardModalSection from './CardModalSection';
import { Card, fetchBoard } from '../../features/boardSlice';
import authRequest from '../../service/authRequest';
import { useAppDispatch } from '../../store';
import { useParams } from 'react-router-dom';

interface CardModalProps {
  card: Card;
  openModal: boolean;
  listName: string;
  boardName: string;
  handleClose: () => void;
}

const CardModal: FC<CardModalProps> = ({ card, openModal, listName, boardName, handleClose }) => {
  const [itemName, setItemName] = useState('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [cheklistName, setcheklistName] = useState('');
  const [dueDate, setDueDate] = useState(false);

  const { id } = useParams();

  const [updateCardObject, setUpdateCardObject] = useState({
    title: card.title!,
    description: card.description!,
    listId: card.listId,
  });

  const [createCommentObject, setCreateCommentObject] = useState({
    cardId: card.id,
    message: '',
  });

  const dispatch = useAppDispatch();

  const theDueDate = format(new Date(startDate), 'MMM dd yyyy');

  const arrayOfLabels = ['High Priority', 'App', 'Feature', 'Design'];

  const toast = useToast();

  const onCardTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateCardObject((prev) => ({ ...prev, title: event.target.value }));
  };

  const onCardDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateCardObject((prev) => ({ ...prev, description: event.target.value }));
  };

  const onCardCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateCommentObject((prev) => ({ ...prev, message: event.target.value }));
  };

  const updateCardTitleDescriptionDueDate = () => {
    authRequest()
      .put(`card/${card.id}`, updateCardObject)
      .then(() => {
        dispatch(fetchBoard(id!));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createCardComment = () => {
    authRequest()
      .post(`comment`, createCommentObject)
      .then(() => {
        dispatch(fetchBoard(id!));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Modal onClose={() => handleClose()} isOpen={openModal} scrollBehavior={'inside'} size="3xl">
        <ModalOverlay />
        <ModalContent borderRadius="xl" mx="30px">
          <ModalHeader bg="purple.500" borderTopRadius="xl">
            <Box display="flex" gap="25px">
              <Menu>
                <MenuButton>
                  <Icon _hover={{ cursor: 'pointer' }} as={BiCalendar} color="white" fontSize="2xl" />
                </MenuButton>
                <MenuList fontSize="sm" boxSize="min-content" px={5}>
                  {!dueDate && (
                    <MenuItem as={Box} closeOnSelect={false} _hover={{ background: 'none' }}>
                      <DatePicker
                        dateFormat="yyyy/MM/dd"
                        selected={startDate}
                        onChange={(date) => {
                          if (!date) return;
                          setStartDate(date);
                          console.log('date: ', format(new Date(date), 'MMM dd yy'));
                          console.log('theDueDate: ', theDueDate);
                          setDueDate(() => !dueDate);
                        }}
                      />
                    </MenuItem>
                  )}
                  {dueDate && (
                    <MenuItem
                      onClick={() => {
                        setStartDate(new Date());
                        setDueDate(false);
                      }}
                    >
                      Remove Due Date
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton>
                  <Icon _hover={{ cursor: 'pointer' }} as={BiLabel} color="white" fontSize="2xl" />
                </MenuButton>
                <MenuList fontSize="sm">
                  <MenuItem closeOnSelect={false}>
                    <CheckboxGroup colorScheme="teal" defaultValue={['naruto', 'kakashi']}>
                      <Stack spacing={[1, 5]} direction={['column']}>
                        <Checkbox value="naruto" onChange={(e) => console.log(e.currentTarget.value)}>
                          <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Text>Naruto</Text> <Icon as={BiLabel} fontSize="2xl" pl="auto" />
                          </Box>
                        </Checkbox>
                        <Checkbox value="sasuke">
                          <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Text>Naruto</Text> <Icon as={BiLabel} fontSize="2xl" pl="auto" />
                          </Box>
                        </Checkbox>
                        <Checkbox value="kakashi">
                          <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Text>Naruto</Text> <Icon as={BiLabel} fontSize="2xl" pl="auto" />
                          </Box>
                        </Checkbox>
                        <Checkbox value="takashi">
                          <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Text>Naruto</Text> <Icon as={BiLabel} fontSize="2xl" pl="auto" />
                          </Box>
                        </Checkbox>
                      </Stack>
                    </CheckboxGroup>
                  </MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton>
                  <Icon _hover={{ cursor: 'pointer' }} as={BiCheckSquare} color="white" fontSize="2xl" />
                </MenuButton>
                <MenuList fontSize="sm" boxSize="-moz-fit-content">
                  {/* <MenuItem closeOnSelect={false}> */}
                  <MenuItem closeOnSelect={false}>
                    <Input
                      placeholder="Checklist title"
                      value={cheklistName}
                      onChange={(e) => setcheklistName(e.currentTarget.value)}
                    />
                    {/* <Button>Add</Button> */}
                  </MenuItem>
                  {/* </MenuItem> */}
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton>
                  <Icon _hover={{ cursor: 'pointer' }} as={BiDotsHorizontalRounded} color="white" fontSize="2xl" />
                </MenuButton>
                <MenuList fontSize="sm" boxSize="-moz-fit-content">
                  <MenuItem onClick={() => alert('clicked')}>Remove Card</MenuItem>
                </MenuList>
              </Menu>
              <Icon
                as={BiX}
                _hover={{ cursor: 'pointer' }}
                ml="auto"
                fontSize="3xl"
                color="white"
                onClick={handleClose}
              />
            </Box>
          </ModalHeader>
          <ModalBody
            pt="30px"
            pb="45px"
            display="flex"
            flexDirection="column"
            gap="20px"
            sx={{
              '&::-webkit-scrollbar': {
                width: '5px',
                borderRadius: '8px',
                backgroundColor: `rgba(0, 0, 0, 0.05)`,
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '8px',
                backgroundColor: `rgb(179,179,179)`,
              },
            }}
          >
            <Box
              id="BREADCRUMB AND DUE DATE"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Breadcrumb spacing="4px" separator={<ChevronRightIcon color="gray.500" />}>
                <BreadcrumbItem>
                  <Text>{boardName}</Text>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Text>{listName}</Text>
                </BreadcrumbItem>
              </Breadcrumb>
              {dueDate && (
                <Box border="1px" borderColor="gray.300" rounded="lg" px="13px" py="19px" fontSize="sm">
                  <Text>Due Date: {theDueDate}</Text>
                  <Popover>
                    <PopoverTrigger>
                      <Button>
                        <Icon _hover={{ cursor: 'pointer' }} as={BiCalendar} color="white" fontSize="2xl" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Confirmation!</PopoverHeader>
                      <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
                    </PopoverContent>
                  </Popover>
                  <DatePicker selected={startDate} onChange={(date) => setStartDate(date!)} />
                </Box>
              )}
            </Box>

            <Box id="CARD TITLE INPUT">
              <Input
                placeholder="Title*"
                size="lg"
                fontSize="sm"
                value={updateCardObject.title}
                onKeyUp={() => {
                  setTimeout(() => {
                    updateCardTitleDescriptionDueDate();
                  }, 2.0 * 1000);
                }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onCardTitleChange(event)}
              />
            </Box>

            <Box id="CARD DESCRIPTION TEXTAREA">
              <Textarea
                placeholder="Description"
                size="sm"
                height="105px"
                rounded="lg"
                resize="none"
                value={updateCardObject.description}
                onKeyUp={() => {
                  setTimeout(() => {
                    updateCardTitleDescriptionDueDate();
                  }, 2.0 * 1000);
                }}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => onCardDescriptionChange(event)}
              />
            </Box>

            <Box id="LABES" display="flex" flexDirection="column" gap="5px">
              <CardModalSection iconType="BiLabel" sectionName="Labels" />
              <Box
                display="flex"
                gap="5px"
                border="1px"
                borderColor="gray.300"
                rounded="lg"
                p="15px"
                overflowX={'auto'}
              >
                {arrayOfLabels?.map((item) => {
                  return <CardModalLabel labelName={item} key={item} />;
                })}
                {/* <CloseButton ml="auto" /> */}
                <Icon as={BiX} _hover={{ cursor: 'pointer' }} ml="auto" fontSize="3xl" color="black" />
              </Box>
            </Box>

            <Box id="COMMENT ENTRY" display="flex" flexDirection="column" gap="5px">
              <CardModalSection iconType="BiCommentDetail" sectionName="Comment" />
              <Box display="flex" flexDirection="row" alignItems="flex-start" gap="15px">
                <Box>
                  <Avatar bg="purple.500" color="white" name="Muratcan Baba" size="sm" />
                </Box>
                <Box width="full" display="flex" flexDirection="column" alignItems="start" gap="15px">
                  <Input
                    placeholder="Add comment"
                    size="lg"
                    fontSize="sm"
                    value={createCommentObject.message}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => onCardCommentChange(event)}
                  />
                  <Button
                    disabled={createCommentObject.message.trim() === ''}
                    colorScheme="teal"
                    variant="solid"
                    borderRadius="100"
                    size="sm"
                    onClick={() => {
                      createCardComment();
                      setCreateCommentObject((prev) => ({ ...prev, message: '' }));
                    }}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CardModal;
