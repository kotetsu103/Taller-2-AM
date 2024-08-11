import React, { useState } from 'react'
import { StatusBar, Text, View, Alert, TouchableOpacity } from 'react-native';
import { TitleComponent } from '../Components/TitleComponent'
import { PRIMARY_COLOR } from '../../commons/Contances'
import { styles } from '../../theme/appTheme'
import { InputComponent } from '../Components/InputComponent'
import { ButtonComponent } from '../Components/ButtonComponent';
import { BodyComponent } from '../Components/BodyComponent';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {}; 

interface FormLogin {
  email: string;
  password: string;
}

let registeredUsers: { email: string, password: string }[] = [];

export const LoginScreen = ({ navigation }: Props) => {

  const [formLogin, setFormLogin] = useState<FormLogin>({
    email: '',
    password: ''
  });


  const [hiddenPaswword, setHiddenPaswword] = useState<boolean>(true);

  const handleSetValues = (name: string, value: string) => {
    setFormLogin({ ...formLogin, [name]: value });
  }


  const handleSignIn = () => {

    if (!formLogin.email || !formLogin.password) {
      Alert.alert('Error', 'Por favor, ingrese valores en todos los campos!');
      return;
    }

    const userExists = registeredUsers.some(user => user.email === formLogin.email && user.password === formLogin.password);
    if (!userExists) {
      Alert.alert('Error', 'Correo y/o contraseña incorrecta!');
      return;
    }

    Alert.alert('Success', 'Login successful');
  }

  return (
    <View>
      <StatusBar backgroundColor={PRIMARY_COLOR} />
      <TitleComponent title='Iniciar Sesión' />
      <BodyComponent>
        <View>
          <Text style={styles.titleHeaderBody}>Bienvenido de nuevo!</Text>
          <Text style={styles.textBody}>Realiza tus compras de manera rápida y segura</Text>
        </View>
        <View style={styles.contentInput}>
          <InputComponent
            placeholder='Email'
            handleSetValues={handleSetValues}
            name='email' />
          <InputComponent
            placeholder='Contraseña'
            handleSetValues={handleSetValues}
            name='password'
            isPassword={hiddenPaswword}
            hasIcon={true}
            setHiddenPaswword={() => setHiddenPaswword(!hiddenPaswword)} />
        </View>
        <ButtonComponent textButton='Iniciar' onPress={handleSignIn} />
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.textRedirection}>No tienes una cuenta? Regístrate ahora</Text>
        </TouchableOpacity>
      </BodyComponent>
    </View>
  )
}
