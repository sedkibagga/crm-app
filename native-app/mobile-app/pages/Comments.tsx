import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CommentsComponent, { CommentType } from '@/components/CommentsComponent';
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Store/Store';
import { ajouter_commentaire, get_All_Comments } from '@/features/apis/apisSlice';
import { ajouteComment } from '@/Types/DataTypes';

const Comments = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { Comments } = useSelector((state: RootState) => state.api);
  const dispatch = useDispatch();
// console.log ("Comments:", Comments);
  const id: string = user?.id;
  const token: string = user?.token;
  const nom = user?.nom;
  

  useEffect(() => {
    if (id && token) {
      dispatch(get_All_Comments({ token, id }) as any);
    }
  }, [dispatch, id, token]);

  const commentsData: CommentType[] = Comments ? Comments.map((comment: any) => ({
    id_comment: comment.id_comment,
    name: comment.name,
    image: comment.user?.image || 'https://bootdey.com/img/Content/avatar/avatar7.png',
    comment: comment.comment,
    user_id_comment : comment.user.id
  })) : [];


  const [commentContent , setCommentContent] = useState<string>("");
  const handleSend = () => {
  if (commentContent.length === 0) {
    throw new Error("Veuillez ajouter un commentaire");
  } 
  const data : ajouteComment = {
    comment : commentContent,
    name : nom
  }  
  console.log("Payload:", { token, id, commentaire: data });

  dispatch(ajouter_commentaire({token , id , commentaire : data}) as any);
  dispatch(get_All_Comments({ token, id }) as any);
  setCommentContent("");
    
  }
  return (
    <View style={styles.container}>
      <CommentsComponent comments={commentsData} />
      <TextInput
        style={styles.input}
        label="Message"
        placeholderTextColor="#fff"
        value={commentContent}
        textColor='black'
        onChange={(e) => setCommentContent(e.nativeEvent.text)}
        right={<TextInput.Icon icon="send" color="blue" onPress={handleSend} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  input: {
    backgroundColor: 'white',
    color: '#fff',
  },
});

export default Comments;
