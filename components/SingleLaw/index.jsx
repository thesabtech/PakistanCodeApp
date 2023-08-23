import React from 'react';
import {View} from 'react-native';
import PdfViewer from '../PdfViewer';
import CryptoJS from 'crypto-js';

const SingleLaw = ({route}) => {
  const actId = route?.params?.law?.ACTID_help;

  const combinedString = actId + 'rSeb1~a52u64,' + 'A*4z!udtL=yw';
  const encryptedId = CryptoJS.MD5(combinedString).toString();

  const pdfUrl = 'administrator' + encryptedId;
  const pdfTitle = route?.params?.law?.title_act_help;

  console.log('PDF URL: ', route?.params?.law?.title_act_help);

  return (
    <View style={{flex: 1}}>
      <PdfViewer pdfUrl={pdfUrl} pdfTitle={pdfTitle} />
    </View>
  );
};

export default SingleLaw;
