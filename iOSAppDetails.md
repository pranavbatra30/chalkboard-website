App.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Animated, Easing, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme, LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import { BottomTabNavigator, DarkTheme, CreatePostScreen, LoginScreen, ForgotPasswordScreen, PostDetailScreen, LikedPostsScreen, UserProfileScreen, EditProfileScreen, OnboardingNavigator, FollowersListScreen, HiddenPostsScreen, ProfileOptionsScreen, VerificationScreen, AlreadyVerifiedScreen, ContactUsScreen, PrivacyPolicyScreen, TermsOfUseScreen, HelpMenuScreen, ReportProblemScreen, ReportsViolationsScreen, FeedbackScreen, HelpCenterScreen, ResearchGroupsListScreen, CreateResearchGroupScreen, GroupDetailScreen, GroupMembersScreen, InviteMembersScreen, UpdatePasswordScreen, ChatsListScreen, ChatScreen, NewChatScreen, NewGroupChatScreen, InviteUserScreen, ChatGroupMembersScreen, ChatSettingsScreen } from './UI';
import { AuthProvider, useAuth } from './UI/contexts/AuthContext';
import { NotificationsProvider } from './UI/contexts/NotificationsContext';
import { MessagingProvider } from './UI/contexts/MessagingContext';
import './api/notifications/push'; // Register Push Notification handlers for Expo

const Stack = createNativeStackNavigator();

const NavigationTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: DarkTheme.colors.background,
        card: DarkTheme.colors.card,
        text: DarkTheme.colors.text,
        border: DarkTheme.colors.border,
        primary: DarkTheme.colors.primary,
    },
};

/** Premium animated "C" splash screen shown while resolving the auth session. */
const LoadingScreen = () => {
    const spinAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(0.6)).current;
    const fadeIn = useRef(new Animated.Value(0)).current;
    const letterScale = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        // Smooth continuous rotation for the loading ring
        Animated.loop(
            Animated.timing(spinAnim, {
                toValue: 1,
                duration: 1800,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ).start();

        // Gentle pulse for the C letter glow
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1200,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0.6,
                    duration: 1200,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ]),
        ).start();

        // Entrance animation
        Animated.parallel([
            Animated.timing(fadeIn, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.spring(letterScale, {
                toValue: 1,
                friction: 8,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const spin = spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={loadingStyles.container} testID="loading-screen">
            <Animated.View
                style={[
                    loadingStyles.logoWrapper,
                    {
                        opacity: fadeIn,
                        transform: [{ scale: letterScale }],
                    },
                ]}
            >
                {/* Outer rotating ring */}
                <Animated.View
                    style={[
                        loadingStyles.spinnerRing,
                        { transform: [{ rotate: spin }] },
                    ]}
                >
                    <View style={loadingStyles.spinnerArc} />
                </Animated.View>

                {/* Inner glow circle */}
                <Animated.View
                    style={[
                        loadingStyles.glowCircle,
                        { opacity: pulseAnim },
                    ]}
                />

                {/* The C letter */}
                <Animated.Text
                    style={[
                        loadingStyles.letterC,
                        { opacity: pulseAnim },
                    ]}
                >
                    C
                </Animated.Text>
            </Animated.View>

            {/* Tagline */}
            <Animated.Text style={[loadingStyles.tagline, { opacity: fadeIn }]}>
                chalkboard
            </Animated.Text>
        </View>
    );
};

const LOGO_SIZE = 100;
const RING_SIZE = LOGO_SIZE + 24;

const loadingStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: DarkTheme.colors.background,
    },
    logoWrapper: {
        width: RING_SIZE,
        height: RING_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    spinnerRing: {
        position: 'absolute',
        width: RING_SIZE,
        height: RING_SIZE,
        borderRadius: RING_SIZE / 2,
        borderWidth: 2.5,
        borderColor: 'transparent',
        borderTopColor: DarkTheme.colors.primary,
        borderRightColor: 'rgba(192, 194, 153, 0.3)',
    },
    spinnerArc: {
        // Empty — the ring border itself is the arc
    },
    glowCircle: {
        position: 'absolute',
        width: LOGO_SIZE,
        height: LOGO_SIZE,
        borderRadius: LOGO_SIZE / 2,
        backgroundColor: 'rgba(192, 194, 153, 0.06)',
        borderWidth: 1,
        borderColor: 'rgba(192, 194, 153, 0.12)',
    },
    letterC: {
        fontSize: 52,
        fontWeight: '300',
        color: DarkTheme.colors.primary,
        letterSpacing: -2,
        // Use a serif-like feel with light weight for elegance
        fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    },
    tagline: {
        marginTop: 20,
        fontSize: 15,
        fontWeight: '400',
        color: 'rgba(192, 194, 153, 0.5)',
        letterSpacing: 6,
        textTransform: 'lowercase',
    },
});

/** Inner component that consumes AuthContext for conditional navigation. */
const AppNavigator = () => {
    const { session, profile, loading, isRecoveryMode } = useAuth();

    // Deep linking configuration
    const linking: LinkingOptions<ReactNavigation.RootParamList> = {
        prefixes: [Linking.createURL('/'), 'chalkboard://'],
        config: {
            screens: {
                Login: 'login',
                UpdatePassword: 'update-password',
                PostDetail: 'post/:id',
                UserProfile: 'user/:userId',
                GroupDetail: 'group/:groupId',
                Chat: 'chat/:conversationId',
                // other screens can be added here
            }
        },
        async getInitialURL() {
            // Check if app was opened from a deep link
            const url = await Linking.getInitialURL();
            if (url != null) {
                return url;
            }

            // Check if app was opened from a push notification
            const response = await Notifications.getLastNotificationResponseAsync();
            const urlFromNotification = response?.notification.request.content.data?.url;
            if (urlFromNotification && typeof urlFromNotification === 'string') {
                return urlFromNotification;
            }

            return null;
        },
        subscribe(listener) {
            const onReceiveURL = ({ url }: { url: string }) => listener(url);
            const eventListenerSubscription = Linking.addEventListener('url', onReceiveURL);

            const subscription = Notifications.addNotificationResponseReceivedListener(response => {
                const url = response.notification.request.content.data?.url;
                if (url && typeof url === 'string') {
                    listener(url);
                }
            });

            return () => {
                eventListenerSubscription.remove();
                subscription.remove();
            };
        },
    };

    return (
        <NavigationContainer theme={NavigationTheme} linking={linking}>
            <NotificationsProvider>
                <MessagingProvider>
                    <StatusBar style="light" />
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        {loading ? (
                            <Stack.Screen name="Loading" component={LoadingScreen} />
                        ) : isRecoveryMode ? (
                            <Stack.Screen name="UpdatePassword" component={UpdatePasswordScreen} />
                        ) : session ? (
                            profile && !profile.onboarding_completed ? (
                                <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
                            ) : (
                                <>
                                    <Stack.Screen name="Main" component={BottomTabNavigator} />
                                    <Stack.Screen
                                        name="CreatePost"
                                        component={CreatePostScreen}
                                        options={{ presentation: 'modal' }}
                                    />
                                    <Stack.Screen
                                        name="PostDetail"
                                        component={PostDetailScreen}
                                    />
                                    <Stack.Screen
                                        name="LikedPosts"
                                        component={LikedPostsScreen}
                                    />
                                    <Stack.Screen
                                        name="UserProfile"
                                        component={UserProfileScreen}
                                    />
                                    <Stack.Screen
                                        name="EditProfile"
                                        component={EditProfileScreen}
                                        options={{ presentation: 'modal' }}
                                    />
                                    <Stack.Screen
                                        name="FollowersList"
                                        component={FollowersListScreen}
                                    />
                                    <Stack.Screen
                                        name="HiddenPosts"
                                        component={HiddenPostsScreen}
                                    />
                                    <Stack.Screen
                                        name="ProfileOptions"
                                        component={ProfileOptionsScreen}
                                    />
                                    <Stack.Screen
                                        name="InviteUser"
                                        component={InviteUserScreen}
                                    />
                                    <Stack.Screen
                                        name="Verification"
                                        component={VerificationScreen}
                                    />
                                    <Stack.Screen
                                        name="AlreadyVerified"
                                        component={AlreadyVerifiedScreen}
                                    />
                                    <Stack.Screen
                                        name="ContactUs"
                                        component={ContactUsScreen}
                                    />
                                    <Stack.Screen
                                        name="PrivacyPolicy"
                                        component={PrivacyPolicyScreen}
                                    />
                                    <Stack.Screen
                                        name="TermsOfUse"
                                        component={TermsOfUseScreen}
                                    />
                                    <Stack.Screen
                                        name="HelpMenu"
                                        component={HelpMenuScreen}
                                    />
                                    <Stack.Screen
                                        name="ReportProblem"
                                        component={ReportProblemScreen}
                                    />
                                    <Stack.Screen
                                        name="ReportsViolations"
                                        component={ReportsViolationsScreen}
                                    />
                                    <Stack.Screen
                                        name="Feedback"
                                        component={FeedbackScreen}
                                    />
                                    <Stack.Screen
                                        name="HelpCenter"
                                        component={HelpCenterScreen}
                                    />
                                    <Stack.Screen
                                        name="ResearchGroups"
                                        component={ResearchGroupsListScreen}
                                    />
                                    <Stack.Screen
                                        name="CreateResearchGroup"
                                        component={CreateResearchGroupScreen}
                                        options={{ presentation: 'modal' }}
                                    />
                                    <Stack.Screen
                                        name="GroupDetail"
                                        component={GroupDetailScreen}
                                    />
                                    <Stack.Screen
                                        name="GroupMembers"
                                        component={GroupMembersScreen}
                                    />
                                    <Stack.Screen
                                        name="InviteMembers"
                                        component={InviteMembersScreen}
                                    />
                                    <Stack.Screen
                                        name="UpdatePassword"
                                        component={UpdatePasswordScreen}
                                    />
                                    <Stack.Screen
                                        name="ChatsList"
                                        component={ChatsListScreen}
                                    />
                                    <Stack.Screen
                                        name="Chat"
                                        component={ChatScreen}
                                    />
                                    <Stack.Screen
                                        name="NewChat"
                                        component={NewChatScreen}
                                    />
                                    <Stack.Screen
                                        name="NewGroupChat"
                                        component={NewGroupChatScreen}
                                        options={{ presentation: 'modal' }}
                                    />
                                    <Stack.Screen
                                        name="ChatGroupMembers"
                                        component={ChatGroupMembersScreen}
                                    />
                                    <Stack.Screen
                                        name="ChatSettings"
                                        component={ChatSettingsScreen}
                                        options={{ presentation: 'modal' }}
                                    />
                                </>
                            )
                        ) : (
                            <>
                                <Stack.Screen name="Login" component={LoginScreen} />
                                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                            </>
                        )}
                    </Stack.Navigator>
                </MessagingProvider>
            </NotificationsProvider>
        </NavigationContainer>
    );
};

export default function App() {
    return (
        <AuthProvider>
            <SafeAreaProvider>
                <AppNavigator />
            </SafeAreaProvider>
        </AuthProvider>
    );
}

Theme.ts
export const DarkTheme = {
    colors: {
        background: '#0B0D0C', // Deep chalkboard black-green
        card: '#151917', // Slightly elevated chalkboard
        cardElevated: '#1A201D',
        cardGlass: 'rgba(21, 25, 23, 0.85)',
        cardGlassBorder: 'rgba(255, 255, 255, 0.08)',
        text: '#F8F9FA', // Chalk white
        textSecondary: '#B5BCB7', // Brighter dusty chalk grey
        textMuted: '#8A918E', // Brighter faded chalk
        primary: '#c0c299ff', // Yellow chalk
        accent: '#7DD3FC', // Blue chalk
        journalClub: '#302039ff', // Journal Club
        danger: '#FCA5A5', // Red/Pink chalk
        successGreen: '#86EFAC', // Green chalk
        success: '#86EFAC', // Green chalk
        border: '#29332E', // Chalkboard faint lines
        divider: '#29332E',
        notification: '#FCA5A5',
        inactive: '#6F7673',
        avatarBackground: '#1A201D',
        gradientStart: '#FDE047',
        gradientEnd: '#7DD3FC',
        shimmer: '#1C2320',
        shimmerHighlight: '#2A3430',
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    },
    borderRadius: {
        sm: 8,
        md: 12,
        lg: 20,
        xl: 28,
        full: 9999,
    },
    fontSize: {
        xs: 12,
        sm: 15,
        md: 16,
        md2: 17,
        lg: 18,
        xl: 22,
        xxl: 28,
    },
    fontWeight: {
        regular: '400' as const,
        medium: '500' as const,
        semiBold: '600' as const,
        bold: '700' as const,
        extraBold: '800' as const,
    },
    shadows: {
        card: {
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 12,
            elevation: 8,
        },
        cardHover: {
            shadowColor: '#FDE047',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 16,
            elevation: 10,
        },
        fab: {
            shadowColor: '#FDE047',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.4,
            shadowRadius: 12,
            elevation: 12,
        },
        subtle: {
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 6,
            elevation: 4,
        },
    },
};

AppLogo.tsx
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { DarkTheme } from '../../theme';

interface AppLogoProps {
    style?: ViewStyle;
    size?: 'small' | 'large';
}

export const AppLogo: React.FC<AppLogoProps> = ({ style, size = 'small' }) => {
    const isLarge = size === 'large';
    const boxSize = isLarge ? 48 : 32;
    const fontSize = isLarge ? 36 : 24;
    const atomicNumSize = isLarge ? 14 : 10;
    const letterSpacing = isLarge ? 6 : 3;
    const boxMarginRight = isLarge ? 6 : 3;

    return (
        <View style={[styles.container, style]} testID="app-logo">
            {/* [6 C] */}
            <View style={[styles.elementBox, { width: boxSize, height: boxSize, marginRight: 2 }]}>
                <Text style={[styles.atomicNumber, { fontSize: atomicNumSize }]}>6</Text>
                <Text style={[styles.elementSymbol, { fontSize: fontSize * 0.95 }]}>C</Text>
            </View>

            <Text style={[styles.text, { fontSize, letterSpacing, marginRight: boxMarginRight }]}>halk</Text>

            {/* [5 B] */}
            <View style={[styles.elementBox, { width: boxSize, height: boxSize, marginRight: 2 }]}>
                <Text style={[styles.atomicNumber, { fontSize: atomicNumSize }]}>5</Text>
                <Text style={[styles.elementSymbol, { fontSize: fontSize * 0.95 }]}>B</Text>
            </View>

            <Text style={[styles.text, { fontSize, letterSpacing }]}>oard</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    elementBox: {
        backgroundColor: '#0F5132', // Dark green Breaking Bad style
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: '#198754', // Lighter green border
        position: 'relative',
    },
    atomicNumber: {
        position: 'absolute',
        top: 2,
        left: 4,
        color: '#E8F5E9',
        fontWeight: 'bold',
        opacity: 0.9,
    },
    elementSymbol: {
        color: '#FFFFFF',
        fontWeight: '900',
    },
    text: {
        color: DarkTheme.colors.primary,
        fontWeight: '800',
    }
});

Contact.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Mail, Globe } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DarkTheme } from '../../theme';

export const ContactUsScreen = () => {
    const navigation = useNavigation<any>();
    const insets = useSafeAreaInsets();

    const handleEmail = () => {
        Linking.openURL('mailto:thechalkboardofficial@gmail.com');
    };

    const handleWebsite = () => {
        Linking.openURL('https://chalkboardresearch.com');
    };

    return (
        <View style={styles.container}>
            <View style={[styles.header, { paddingTop: insets.top + DarkTheme.spacing.sm }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft color={DarkTheme.colors.text} size={24} />
                </TouchableOpacity>
                <Text style={styles.title}>Contact Us</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
                <View style={styles.card}>
                    <Text style={styles.description}>
                        Have a question, feedback, or need assistance? We're here to help!
                        Choose a method below to get in touch with our support team.
                    </Text>

                    <TouchableOpacity style={styles.contactItem} onPress={handleEmail}>
                        <View style={styles.iconContainer}>
                            <Mail color={DarkTheme.colors.primary} size={24} />
                        </View>
                        <View style={styles.contactTextContainer}>
                            <Text style={styles.contactTitle}>Email Support</Text>
                            <Text style={styles.contactSubtitle}>thechalkboardofficial@gmail.com</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.contactItem} onPress={handleWebsite}>
                        <View style={styles.iconContainer}>
                            <Globe color={DarkTheme.colors.primary} size={24} />
                        </View>
                        <View style={styles.contactTextContainer}>
                            <Text style={styles.contactTitle}>Visit Our Website</Text>
                            <Text style={styles.contactSubtitle}>www.chalkboardresearch.com</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DarkTheme.colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: DarkTheme.spacing.md,
        paddingBottom: DarkTheme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: DarkTheme.colors.divider,
    },
    backButton: {
        padding: DarkTheme.spacing.xs,
    },
    title: {
        fontSize: DarkTheme.fontSize.lg,
        fontWeight: 'bold',
        color: DarkTheme.colors.text,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: DarkTheme.spacing.md,
    },
    card: {
        backgroundColor: DarkTheme.colors.cardElevated,
        borderRadius: DarkTheme.borderRadius.lg,
        padding: DarkTheme.spacing.lg,
        borderWidth: 1,
        borderColor: DarkTheme.colors.border,
    },
    description: {
        fontSize: DarkTheme.fontSize.md,
        color: DarkTheme.colors.textSecondary,
        lineHeight: 24,
        marginBottom: DarkTheme.spacing.xl,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: DarkTheme.colors.background,
        padding: DarkTheme.spacing.md,
        borderRadius: DarkTheme.borderRadius.md,
        marginBottom: DarkTheme.spacing.md,
        borderWidth: 1,
        borderColor: DarkTheme.colors.border,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: DarkTheme.colors.cardGlassBorder,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: DarkTheme.spacing.md,
    },
    contactTextContainer: {
        flex: 1,
    },
    contactTitle: {
        fontSize: DarkTheme.fontSize.md,
        fontWeight: '600',
        color: DarkTheme.colors.text,
        marginBottom: 2,
    },
    contactSubtitle: {
        fontSize: DarkTheme.fontSize.sm,
        color: DarkTheme.colors.primary,
    },
});

App Description: Welcome to [C]halk[B]oard
Every great scientific breakthrough started as a messy scribble on a chalkboard. But where do those late-night, unfiltered "Eureka!" moments go today?

Traditional social media is loud, unverified, and frankly, making us less smart. On the other hand, platforms like ResearchGate are too formal—nobody wants to post a half-baked hypothesis where it permanently impacts their official academic profile.

Enter [C]halk[B]oard (chalkboardresearch.com).

We are an exclusive, informal collaborative hub built specifically for researchers. Think of us as the "Reddit for Academics," but strictly vetted. Chalkboard allows you to share raw research ideas, debate methodologies, and connect with peers in your specific domain without the pressure of official publication. Protect your intellectual property by directing posts to a qualified audience of your choice, engage in high-level discourse, and build your academic presence. If you aren't on Chalkboard, you're missing out on the actual conversation.

Major Features Built to Attract Users
To make Chalkboard the definitive "must-have" app for the academic community, the features are categorized into four core pillars:

1. The Vetted, High-Signal Ecosystem
Strict Audience Vetting: An ecosystem free from the noise of the general public. Users are verified to ensure you are talking to actual peers, professors, and students.

Granular Privacy Controls: Got a niche idea? Share your post only with verified users, specific academic levels (e.g., Masters, Undergrads), or limit it entirely to your private Research Group.

Role-Based Networking: Badges for Professors, Students, and Independent Researchers. Verified professors can even sponsor and invite their students directly to the platform.


2. Tailored Academic Content Creation
Automated "Rich Card" Citations: Don't waste time typing out references. Paste an arXiv URL or DOI, and Chalkboard automatically fetches the metadata (Title, Authors, Abstract) into a clean, clickable card.

Built for Science: Native support for adding mathematical equations and beautifully formatted, color-coded code blocks directly in your posts.

The AI "Devil's Advocate": Before publishing, use the built-in AI to instantly critique your idea. It acts as a private peer-reviewer, pointing out potential methodological flaws so you can strengthen your hypothesis before your peers see it.

Methodological Micro-Polls: Settle lab debates quickly. Ask your vetted peers highly specific questions (e.g., "Which normalization method is best for this spectrometer data?") and get statistically significant consensus.

3. Smart Discovery & Organization
Intelligent Recommendation Engine: A dynamic feed tailored to your exact niche. The algorithm surfaces posts based on your declared research areas, your institution, the tags you interact with, and the peers you follow.

Advanced Feed Filtering: Instantly filter your homepage by broader subjects (e.g., Physics, Math), hyper-specific sub-domains, or toggle to see posts only from verified experts.

Bookmarks & Private Folders: Researchers are information hoarders. Save and categorize posts into private folders like "Thesis Ideas" or "Literature Review" for easy access later.

Dynamic Search & Sub-communities: Easily toggle between searching for niche posts, specific users, or dedicated Research Groups managed by admins.

4. Premium Community Engagement
Live "Journal Clubs" (Academic AMAs): When a verified user publishes a new paper, they can attach it to a "Live Journal Club" thread. This post gets highlighted at the top of the feed for two hours, creating a concentrated, real-time debate about the findings.

"Lab Openings" Recruitment Board: A massive utility for professors. Flag a post as a "Recruitment" opportunity to advertise funded PhD or Post-Doc positions directly to a hyper-targeted pool of vetted students in your exact sub-domain.

Comprehensive Academic Profiles: Your profile acts as your modern academic business card, showcasing your verified status, research areas, linked publications, citations, and followers.