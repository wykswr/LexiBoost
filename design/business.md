# Business Logic Design: LexiBoost

## Notation

Those colored texts mean the functional webpages need to be implemented:

* <span style="color: green;">Necessary component for this stage</span>
* <span style="color: cyan;">Component used in both current and future development</span>
* <span style="color: pink;">Component only used in future development</span>

## Introduction

This is a language learning platform that helps users enhance their vocabulary skills
through flashcards. The application provides features such as account authentication, subscription management, and
personal learning profiles.

## Key Features

* Account Authentication: Users can create an account by providing necessary details such as username, email,
  and password. Existing users can log in using their credentials. And users can reset their password if they forget it.
* User Profile: The system will implement user roles (regular user, premium user, teacher, robot) and some personal
  information (username, email, learning goals, etc.) for each user.
* Flashcard Management: Flashcards are organized into decks. Users can import the decks from our marketplace or delete
  the decks from their library.
* Flashcard Learning: The application will present flashcards to users in a
  randomized manner for practice. Users can mark they know or don't know the word. The system will record those
  unknown words and reveal the meaning of it.
* Learning Track: The system will track users' progress and provide personalized learning recommendations based on their
  performance and identified areas of improvement.
* Subscription Management: Users can subscribe to premium plans, manage their subscription settings, and access premium
  features such as advanced analytics and additional flashcard sets.

## Modules

### Account Management

The Account Management module handles user registration, login, and account-related operations.

1. <span style="color: green;">User Registration</span>:
    * A form to provide necessary details such as username, email, and password.
    * The system will verify the username and email to ensure they are unique.
    * The system will send a verification email to the user's email address.
2. <span style="color: green;">User Login</span>: Existing users can log in to their accounts by providing their
   username/email and password.
3. <span style="color: green;">Password Reset</span>: Users can request a password reset if they forget their password.
   The system sends a password reset link to the user's registered email address, allowing them to set a new password.

### <span style="color: green;">Home Page</span>

#### Menu to another component:

1. Marketplace
2. User Library
3. User Profile
4. Subscription Management
5. Learning Track
6. Account Management
7. Continue Learning
8. Chat

#### Statistics

From the learning track, the system will show the user's statistics, including the number of flashcards learned,
study time. And the progress bar of achieving the learning goal.

### Marketplace

The Marketplace module enables users to browse and import flashcard decks created by other users or provided by the
platform.

#### <span style="color: green;">Deck List</span>

The Deck List module within the Marketplace enables users to browse and import flashcard decks created by other users or
provided by the platform.

1. Flashcard Deck Listing: The system displays a catalog of available flashcard decks, showcasing relevant details such
   as the deck's title, description, and tags. Users can search, sort, and filter the decks based on their
   preferences.
2. Deck Import: Users can click a button to import flashcard decks from the marketplace into their personal library.

#### <span style="color: cyan;">Deck Details</span>

The Deck Details module within the Marketplace provides additional information and interaction options for specific
flashcard decks.

1. Ratings: Users can rate for flashcard decks.
2. Comments: Users can leave comments for flashcard decks. The comments can be liked by other users and sorted by the
   number of likes.

### User Library

The User Library module provides functionality related to creating and organizing flashcard decks within a user's
personal library.

#### <span style="color: green;">Bookshelf</span>

The Bookshelf functionality enables users to organize their flashcard decks within their library.

1. Deck Organization: Users can add notes or delete decks in their library. They can assign a short description or some
   tags to each deck to help them identify the deck's content.
2. Deck Creation: Users can create their own flashcard decks.
3. Deck Sharing: Users can share their decks to the marketplace.

#### <span style="color: cyan;">Deck Editor</span>

1. Deck information: Users can edit the deck's title, description, and tags.
2. AI deck creation: Users can create a deck by providing a topic. The system will automatically generate a deck based
   on the topic.

#### <span style="color: green;">Card Editor</span>

The Card Editor module provides a dedicated interface for users to create, edit, and manage individual flashcards within
a deck.

1. Single Card Creation: Users can create new flashcards by providing the word, its definition, and an optional image.
2. Batch Upload from File: Users can import flashcards from a CSV file. The system parses the file and creates new
   flashcards for each row.

#### Deck Profile

1. <span style="color: green;">Note and tag</span>: Users can add notes or tags to the deck.
2. <span style="color: cyan;">Deck statistics</span>: The system will show the deck's statistics, including the number
   of cards, the number of cards that users know.

### <span style="color: green;">Flashcard Learning</span>

1. Flashcard Presentation: The system displays flashcards to users one at a time, presenting the word or phrase on one
   side and the meaning/description on the other side.
2. Randomized Presentation: To prevent predictability and promote effective learning, the flashcards are presented to
   users in a randomized order.
3. User Response: After viewing each flashcard, users can indicate their level of familiarity or understanding by
   selecting an appropriate response. Common options include "I know it" or "I don't know it." This response helps the
   system
   adapt the learning process based on the user's self-assessment. They can also burn the card if they don't want to see
   it again.
4. Unknown Word Tracking: If a user marks a word or phrase as unknown or difficult, the system tracks these specific
   flashcards to prioritize their repetition and reinforce learning.
5. Word Meaning Display: For the flashcards marked as unknown or difficult, the system provides the corresponding
   meaning or definition to assist users in understanding and memorizing the word or phrase.

### User Profile

#### <span style="color: green;">Personal Details</span>

Personal Details: Users can view and update their personal details such as name, and contact
information (email used to reset password).

#### <span style="color: pink;">Learning Interests</span>

Users can specify their language learning interests, such as preferred topics, or some language tests they want to
prepare for.

### Learning Track

#### <span style="color: cyan;">Progress Tracking</span>

The Progress Tracking module allows users to track their learning progress and view
their performance metrics.

1. Performance Metrics: Users can view an overview of their learning progress, including the number of flashcards
   learned,
   total study time, and the vocabularies they easily forget.
2. Suggestions: The system will provide personalized learning suggestions based on the user's performance and identified
   areas of improvement.
3. Study History: Users can access their study history, which includes details such as the date, time, and duration of
   each study session.

#### <span style="color: pink;">Progress Editor</span>

The Progress Editor module enables authorized users, such as teachers or robots, to modify the learning suggestions
provided to students based on their learning progress.

1. Suggestions Modification: Authorized users can review and edit the personalized learning suggestions generated by the
   system for individual students.
2. Targeted Recommendations: Users with editing privileges can tailor the learning suggestions to address specific
   learning
   needs or goals of students.

### Chat

#### <span style="color: pink;">Contact List</span>

2. Online Presence: The system indicates the online status of contacts to show who is currently available for chat.

#### <span style="color: pink;">Chat Box</span>

The Chat Box provides a real-time messaging interface for users to exchange messages with their contacts.

### Subscription Management

The Subscription Management module handles the subscription-related functionality for users who wish to access premium
features. It includes the following functionality:

1. <span style="color: cyan;">Subscription Plans</span>: The system offer subscription with different
   durations, e.g. monthly, quarterly, and annual.
2. <span style="color: cyan;">Subscription Purchase</span>: Users can subscribe to a premium plan by selecting the
   desired subscription duration and
   providing payment information. The system securely processes the payment and activates the corresponding premium
   features for the user's account.
3. <span style="color: cyan;">Subscription Cancellation</span>: Users have the option to cancel their subscription,
   which will prevent future billing and
   revoke access to premium features once the current subscription period ends.

## Use Cases

[to be completed]

## Data Sources