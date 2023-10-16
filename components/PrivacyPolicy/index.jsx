import moment from 'moment';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

const PrivacyPolicy = () => {
  const currentDate = moment().format('dddd, MMMM Do YYYY');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.subTitle}>Last updated: {currentDate}</Text>

      <Text style={styles.heading}>Introduction</Text>
      <Text style={styles.text}>
        Welcome to Pakistan Code's Privacy Policy. We are committed to
        protecting the privacy and security of our data in compliance with the
        laws of Pakistan.
      </Text>

      <Text style={styles.heading}>Information Collection and Use</Text>
      <Text style={styles.subHeading}>Personal Identification Information</Text>
      <Text style={styles.text}>
        We may use cookies and similar technologies to enhance your browsing
        experience, but these do not collect personal information.
      </Text>

      <Text style={styles.subHeading}>
        Non-Personal Identification Information
      </Text>
      <Text style={styles.text}>
        We may collect non-personal identification information including, but
        not limited to, browser details, device details, and other technical
        information for analytics and improving the functionality of the site.
      </Text>

      <Text style={styles.heading}>Security</Text>
      <Text style={styles.text}>
        We employ industry-standard security practices to ensure the security of
        your information.
      </Text>

      <Text style={styles.heading}>Contact Us</Text>
      <Text style={styles.text}>
        If you have any questions or suggestions about our Privacy Policy, do
        not hesitate to contact us at contact@molaw.gov.pk
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
  },
  text: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default PrivacyPolicy;
