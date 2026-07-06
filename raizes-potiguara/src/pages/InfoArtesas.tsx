import ChangePassword from "@/components/general/ChangePassword";
import MicButton from "@/components/general/MicButton";
import { CORES, TAMANHO } from "@/util/constants";
import { Box, Button, Card, Circle, DatePicker, Field, Flex,IconButton, Input, InputGroup, Portal, SkeletonCircle, Text, Textarea } from "@chakra-ui/react";
import { ArrowLeft, Pencil } from "lucide-react";
import { LuAtSign, LuBadgeInfo, LuCalendar, LuCoins, LuHouse, LuMail, LuUser } from "react-icons/lu";
import { useNavigate } from "react-router";

const InfoArtesas = () => {
    
const navigate = useNavigate();
const userId = 1

  return (
    <>
    <Box>
      <Card.Root  
      m={0} 
      p={0} 
      mt={8}
      borderTopRadius={24}
      borderBottomRadius={0}>
          <Card.Body 
          m={0} 
          p={0}
          borderTopRadius={24}
          borderBottomRadius={0}
          bgColor={CORES.BRANCO}>
                  <Box p={8} color={CORES.CINZA_ESCURO}>
                    <Flex mb={8} alignItems={"center"} placeContent={"space-between"}>
                        <Text color={CORES.PRETO} className="hashira" lineHeight={1.1} fontWeight={"bold"} fontSize={TAMANHO.TITULO_SECAO}>
                            Minhas <br/> Informações
                        </Text>
                        {
                        <IconButton 
                        bgColor={CORES.PRETO} 
                        color={CORES.BRANCO} 
                        size={"xl"} 
                        boxShadow={"md"}
                        rounded={"full"}
                        onClick={()=>navigate(`/perfil/${userId}`)}
                        >
                            <ArrowLeft/>
                        </IconButton>
                        }
                    </Flex>
                    <Flex flexDir={"column"} alignItems={"center"} gap={4}>
                        <Box mb={4} position="relative" w="150px" h="150px">
                          <Circle
                            size="150px"
                            bgColor={CORES.CINZA_CLARO}
                            borderColor={CORES.CREME}
                            color={CORES.PRETO}
                            overflow="hidden"
                            boxShadow={"md"}
                          >
                            <SkeletonCircle size="full" />
                          </Circle>

                          <Box
                            position="absolute"
                            inset={0}
                            bg="blackAlpha.500"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            borderRadius="full"
                            cursor="pointer"
                            transition="background 0.2s"
                            _hover={{
                              bg: "blackAlpha.600",
                            }}
                          >
                            <Pencil color="white" size={28} />
                          </Box>
                        </Box>
                        
                        <Field.Root required>
                            <Field.Label>
                              Nome completo <Field.RequiredIndicator />
                            </Field.Label>
                            <InputGroup startElement={<LuUser />}>
                              <Input
                                boxShadow="xs"
                                rounded="md"
                                placeholder="Seu nome completo..."
                              />
                            </InputGroup>
                          </Field.Root>

                          <Flex gap={4}>
                            <Field.Root w={"45%"} required flex={1}>
                            <Field.Label>
                                Data de Nascimento <Field.RequiredIndicator />
                            </Field.Label>
                            <DatePicker.Root maxWidth="20rem">
                            <DatePicker.Control>
                                <DatePicker.Input />
                                <DatePicker.IndicatorGroup>
                                <DatePicker.Trigger>
                                    <LuCalendar />
                                </DatePicker.Trigger>
                                </DatePicker.IndicatorGroup>
                            </DatePicker.Control>
                            <Portal>
                                <DatePicker.Positioner>
                                <DatePicker.Content bgColor={CORES.PRETO} color={CORES.BRANCO}>
                                    <DatePicker.View view="day">
                                    <DatePicker.Header />
                                    <DatePicker.DayTable />
                                    </DatePicker.View>
                                    <DatePicker.View view="month">
                                    <DatePicker.Header />
                                    <DatePicker.MonthTable />
                                    </DatePicker.View>
                                    <DatePicker.View view="year">
                                    <DatePicker.Header />
                                    <DatePicker.YearTable />
                                    </DatePicker.View>
                                </DatePicker.Content>
                                </DatePicker.Positioner>
                            </Portal>
                            </DatePicker.Root>
                            </Field.Root>

                        <Field.Root required flex={2}>
                            <Field.Label>
                            CPF <Field.RequiredIndicator />
                            </Field.Label>
                            <InputGroup startElement={<LuBadgeInfo />}>
                            <Input
                                placeholder="000.000.000-00"
                                maxLength={14}
                                boxShadow="xs"
                                rounded="md"
                                bg={CORES.BRANCO}
                            />
                            </InputGroup>
                        </Field.Root>
                        </Flex>

                          <Field.Root required>
                            <Field.Label>
                              Aldeia / Comunidade<Field.RequiredIndicator />
                            </Field.Label>
                            <InputGroup endElement={<LuHouse />}>
                              <Input
                                boxShadow="xs"
                                px={4}
                                rounded="md"
                                placeholder="De que aldeia você é?"
                              />
                            </InputGroup>
                          </Field.Root>

                          <Field.Root required>
                            <Field.Label>
                              Chave Pix <Field.RequiredIndicator />
                            </Field.Label>
                            <InputGroup endElement={<LuCoins />}>
                              <Input
                                boxShadow="xs"
                                px={4}
                                rounded="md"
                                placeholder="Sua chave pix..."
                              />
                            </InputGroup>
                          </Field.Root>

                          <Field.Root>
                            <Field.Label>
                              E-mail <Field.RequiredIndicator />
                            </Field.Label>
                            <InputGroup startElement={<LuMail />}>
                              <Input
                                boxShadow="xs"
                                rounded="md"
                                placeholder="Seu endereço de email..."
                              />
                            </InputGroup>
                          </Field.Root>

                          <Flex gap={2}>
                            <Field.Root flex={1}>
                              <Field.Label>Instagram</Field.Label>
                              <InputGroup startElement={<LuAtSign />}>
                                <Input
                                  boxShadow="xs"
                                  rounded="md"
                                  placeholder="Instagram"
                                />
                              </InputGroup>
                            </Field.Root>

                            <Field.Root flex={1}>
                              <Field.Label>Facebook</Field.Label>
                              <InputGroup startElement={<LuAtSign />}>
                                <Input
                                  boxShadow="xs"
                                  rounded="md"
                                  placeholder="Facebook"
                                />
                              </InputGroup>
                            </Field.Root>
                          </Flex>

                          <Field.Root>
                            <Field.Label>Sobre mim</Field.Label>
                            <Textarea
                              boxShadow="xs"
                              placeholder="Sobre mim..."
                              minH="20vh"
                              maxH="40vh"
                            />
                          </Field.Root>

                          <Button 
                          fontSize={TAMANHO.TEXTO_BOTAO} 
                          mt={4} 
                          boxShadow={"sm"}
                          w={"full"} 
                          bgColor={CORES.VERMELHO_MEDIO} 
                          rounded={"full"}>
                            Salvar alterações
                          </Button>

                          <ChangePassword/>
                    </Flex>
                  </Box>
          </Card.Body>
      </Card.Root>

    </Box>
       <MicButton />
    </>
  );
};

export default InfoArtesas;
