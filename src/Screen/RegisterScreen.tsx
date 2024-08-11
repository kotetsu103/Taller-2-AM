import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { styles } from '../../theme/appTheme';
import { TitleComponent } from '../Components/TitleComponent';
import { BodyComponent } from '../Components/BodyComponent';
import { InputComponent } from '../Components/InputComponent';
import { ButtonComponent } from '../Components/ButtonComponent';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {}; 

let registeredUsers: { email: string, password: string }[] = [];

export const RegisterScreen = ({ navigation }: Props) => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSetValues = (name: string, value: string) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = () => {
    const { email, password, confirmPassword } = formValues;

    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Error', 'El correo electrónico no es válido');
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    const userExists = registeredUsers.some(user => user.email === email);
    if (userExists) {
      Alert.alert('Error', 'El correo electrónico ya está registrado');
      return;
    }

    registeredUsers.push({ email, password });

    Alert.alert('Éxito', 'El Usuario ha sido registrado correctamente');
    navigation.navigate('Login');
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1 }}>
        <TitleComponent title="Registro" />
        <BodyComponent>
          <View>
            <Text style={styles.titleHeaderBody}>¡Aquí inicia tu Aventura!</Text>
            <Text style={styles.textBody}>Asegúrate de llenar tus datos correctamente</Text>
          </View>
          <View style={styles.contentInput}>
            <InputComponent
              placeholder="Email"
              name="email"
              handleSetValues={handleSetValues}
            />
            <InputComponent
              placeholder="Password"
              name="password"
              handleSetValues={handleSetValues}
              isPassword={!isPasswordVisible}
              hasIcon
              setHiddenPaswword={togglePasswordVisibility}
            />
            <InputComponent
              placeholder="Confirm Password"
              name="confirmPassword"
              handleSetValues={handleSetValues}
              isPassword={!isPasswordVisible}
              hasIcon
              setHiddenPaswword={togglePasswordVisibility}
            />
          </View>
          <ButtonComponent
            textButton="Registro"
            onPress={handleRegister}
          />
          <ButtonComponent
            textButton="Regresar"
            onPress={() => navigation.navigate('Login')}
          />
        </BodyComponent>
      </View>
    </ScrollView>
  );
};
