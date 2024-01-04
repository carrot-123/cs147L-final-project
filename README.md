# Self Care Box
This is my final project for the _Cross-platform Mobile App Development_ (CS147L) class at Stanford in Fall Quarter 2023.

A self care box is a physical box that people have on hand when they feel like they need some self care. Usually, the box contains tissues, chocolates, face masks, photos, anything that can help cheer someone up. This app helps users create virtual self care boxes. Users can browse boxes they have made and filter them based on time of day or whether they are “starred.” In addition, users can create new boxes which includes providing a name, a cover image, a description, a self care routine to follow, a list of items needed, some playlists to watch or listen to, and some words of affirmation. Users can also edit existing boxes. 

This app prevents against user errors, such as disabling the save button when a user leaves a field blank during box creation/editing, as well as providing a warning label that the field is blank. The app also reconfirms with the user when the delete or cancel button is pressed.

I used [Supabase](https://supabase.com/docs)’s table to store boxes as well as useProvider and useReducer to keep track of the boxes' states across different screens. I also used Supabase’s buckets to store preset cover images. I used [Expo Router](https://docs.expo.dev/router/introduction/) to navigate across different screens, and [React Native Paper](https://callstack.github.io/react-native-paper/) for various UI components. This project was run on [Expo Go](https://expo.dev/client).



# Video Demo
https://github.com/carrot-123/cs147L-final-project/assets/122314505/3bd4442c-f88f-4c17-852e-2c965dde688a

