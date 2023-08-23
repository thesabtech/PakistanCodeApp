import {Icon} from '@ui-kitten/components';
import React, {useState} from 'react';
import {
  Platform,
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import PDFView from 'react-native-view-pdf';
import RNFetchBlob from 'rn-fetch-blob';

const DownloadIcon = props => (
  <Icon {...props} name="download-outline" fill="#f7f7f7" />
);

const PdfViewer = ({pdfUrl, pdfTitle}) => {
  const resources = {
    file:
      Platform.OS === 'ios'
        ? 'downloadedDocument.pdf'
        : '/sdcard/Download/downloadedDocument.pdf',
    url: `https://pakistancode.gov.pk/pdffiles/${pdfUrl}.pdf`,
    base64: 'JVBERi0xLjMKJcfs...',
  };

  const [isLoading, setIsLoading] = useState(true);
  const selectedResource = resources.url;

  const downloadFile = async () => {
    try {
      const {dirs} = RNFetchBlob.fs;
      const downloadDest = `${dirs.DownloadDir}/${pdfUrl}.pdf`;
      console.log('Directory: ', RNFetchBlob.fs.dirs.DownloadDir);

      const configOptions = {
        fileCache: true,
        appendExt: 'pdf',
        path: downloadDest,
      };

      const res = await RNFetchBlob.config(configOptions).fetch(
        'GET',
        selectedResource,
      );

      if (Platform.OS === 'ios') {
        await RNFetchBlob.fs.writeFile(downloadDest, res.data, 'base64');
      }

      alert(
        'File saved to ' + (Platform.OS === 'ios' ? downloadDest : res.path()),
      );
    } catch (error) {
      alert('Download failed: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pdfTitle}</Text>

      {isLoading && (
        <View style={styles.centered}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      )}

      <PDFView
        fadeInDuration={250.0}
        resource={selectedResource}
        style={{flex: 1, opacity: isLoading ? 0 : 1}}
        onLoad={() => setIsLoading(false)}
        onError={error => {
          console.log('Cannot render PDF', error);
          setIsLoading(false);
        }}
      />

      <TouchableOpacity style={styles.downloadButton} onPress={downloadFile}>
        <DownloadIcon style={{height: 20, width: 20, color: '#efefef'}} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
  },
  centered: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -20}, {translateY: -25}],
    zIndex: 1,
  },
  downloadButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PdfViewer;
