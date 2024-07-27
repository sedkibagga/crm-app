import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Store/Store';
import { get_All_Comments, modifier_commentaire, supprimer_commentaire } from '@/features/apis/apisSlice';
import { Modal, Portal, TextInput } from 'react-native-paper';
import { Button } from '@rneui/themed';
import { modifierComment } from '@/Types/DataTypes';

export type CommentType = {
  id_comment: string;
  name: string;
  image?: string;
  comment: string;
  date?: Date; 
  user_id_comment : string

};
type CommentsComponentProps = {
  comments: CommentType[];
};

const CommentsComponent: FC<CommentsComponentProps> = ({ comments }) => {
 
  const { user } = useSelector((state: RootState) => state.auth);
  const token = user?.token;
  const id = user?.id;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedComment, setSelectedComment] = useState<CommentType>({} as CommentType);
  const [commentText, setCommentText] = useState<string>('');
  // console.log("selectedComment:", selectedComment);
  const formatDateTime = (date?: Date) => {
    if (!date) date = new Date();

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handleDeleteComment = (token: string, id: string, id_comment: string , user_id_comment : string) => {
    if (id !== user_id_comment) {
      alert('Vous ne pouvez pas supprimer ce commentaire');
      return;
    }
    if (id && token && id_comment) {
      console.log("id:", id);
      console.log("token:", token);
      console.log("id_comment:", id_comment);
      dispatch(supprimer_commentaire({ token, id, id_comment }) as any);
      dispatch(get_All_Comments({ token, id }) as any);
    }
  };
  
  useEffect(() => {
    if (id && token) {
      dispatch(get_All_Comments({ token, id }) as any);
    }
  }, [dispatch, id, token]);

  const handleLongPress = (comment: CommentType) => {
    setSelectedComment(comment);
    setCommentText(comment.comment); 
    setShowModal(true); 
  };

  const handleUpdateComment = (token:string , id_comment: string , comment:string , id: string , user_id_comment : string) => {
    console.log ("tokenincomponent:", token , "id_comment:", id_comment , "comment:", comment , "id:", id , "user_id_comment:", user_id_comment);
    if (id !== user_id_comment) {
        alert('Vous ne pouvez pas modifier ce commentaire');
        return;
    }
    if (id && token && id_comment) {
        const modifierCommentObject: modifierComment = {
            comment: comment,
        };
        dispatch(modifier_commentaire({ token, id_comment, comment: modifierCommentObject, id }) as any);
        dispatch(get_All_Comments({ token, id }) as any);
        setShowModal(false);
    }
};

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={styles.root}
        data={comments}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={(item) => item.id_comment.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onLongPress={() => handleLongPress(item)} style={styles.container}>
            <Image style={styles.image} source={{ uri: item.image || 'https://bootdey.com/img/Content/avatar/avatar7.png' }} />
            <View style={styles.content}>
              <View style={styles.contentHeader}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.time}>{formatDateTime(item.date)}</Text>
                <TouchableOpacity onPress={() => handleDeleteComment(token, id, item.id_comment , item.user_id_comment)}>
                  <Ionicons name="close-circle" size={24} color="red" />
                </TouchableOpacity>
              </View>
              <Text>{item.comment}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <Portal>
        <Modal visible={showModal} onDismiss={() => setShowModal(false)} contentContainerStyle={styles.modal}>
          <TextInput
            label="Edit Comment"
            value={commentText}
            onChangeText={setCommentText}
            style={styles.input}
          />
          <Button style={styles.updateButton} onPress={() => {handleUpdateComment(token ,selectedComment?.id_comment , commentText , id , selectedComment?.user_id_comment )}} color="#1c2b4b">
            Update
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  input: {
    marginBottom: 10,
  },
  updateButton: {
    marginTop: 10,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 22,
    marginLeft: 20,
  },
  time: {
    fontSize: 11,
    color: '#808080',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CommentsComponent;
