import { StyleSheet, Dimensions, StatusBar } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    safeView: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    logo: {
        width: 200,
        height: 150,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#262C40',
        padding: 10,
        marginVertical: 5,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Montserrat-Regular'
    },
    loginButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#262C40'
    },
    buttonText2: {
        color: '#222',
    },
    authScreenHeader: {
        marginHorizontal: 40,
        paddingVertical: 90,
        position: 'absolute',
        zIndex: 1,
        backgroundColor: '#fff'
    },
    activeHeaderText: {
        paddingVertical: 5,
        fontSize: 35,
        fontFamily: 'Montserrat-Bold'
    },
    inactiveHeaderText: {
        paddingVertical: 5,
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        color: 'grey'
    },
    passwordText: {
        fontFamily: 'Montserrat-Regular',
        paddingTop: 15
    },
    buttonView: {
        width: '85%',
    },
    inputView: {
        width: '85%',
        marginBottom: 20,
    },
    authInput: {
        fontFamily: 'Montserrat-Regular',
        padding: 10,
        borderBottomWidth: 2,
        borderColor: '#ababab',
        marginVertical: 5,
    },
    meditationHeader: {
        width: 250,
        marginHorizontal: 20,
        paddingTop: 85,
        paddingBottom: 50,
    },
    meditationHeaderText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 28,
    },
    meditationCardContainer: {
        marginHorizontal: 20
    },
    meditationCard: {
        width: '100%',
        overflow: 'hidden',
        borderRadius: 20,
        marginVertical: 10
    },
    meditationCardImage: {
        width: '100%',
        height: 150,
    },
    meditationCardTextContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    meditationCardName: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontFamily: 'Montserrat-Bold'
    },
    meditationCardDesc: {
        color: 'white',
        fontSize: 14,
        paddingTop: 8,
        fontFamily: 'Montserrat-Regular'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    headerLeftView: {
        position: 'absolute',
        left: 20,
        right: 20,
        zIndex: 1,
        top: 60
    },
    programTextContainer: {
        position: 'absolute',
        bottom: 200,
        left: 20,
        right: 20,
        zIndex: 2
    },
    programTextHeader: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 25,
        color: '#fff',
        paddingVertical: 10,
        marginBottom: 20
    },
    programText: {
        fontFamily: 'Montserrat-Regular',
        color: '#fff',
        fontSize: 16,
    },
    programBottomContainer: {
        zIndex: 2,
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        paddingVertical: 10,
        marginHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    programListHeader: {
        marginHorizontal: 20,
        paddingTop: 85,
        paddingBottom: 50,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    programList: {
        marginHorizontal: 20,
        paddingTop: 10,
    },
    programSubHeader: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        paddingBottom: 10
    },
    programMainList: {
        paddingVertical: 10,
    },
    programListTextView: {
        backgroundColor: "rgba(0,0,0,0.12)",
        marginVertical: 5,
        borderRadius: 15,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginVertical: 8,

    },
    programListText: {
        fontFamily: 'Montserrat-Regular',
        paddingVertical: 15,
    },
    playView: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 50,
        right: 50,
        top: 325,
        borderRadius: 75,
        zIndex: 1,
    },
    playOverlay: {
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255, 0.1);',
        borderRadius: 150,
        height: 190,
        width: 190,
        zIndex: 0

    },
    playViewCon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(255,255,255, 0.5);',
        zIndex: 99,

    },
    progressBar: {
        height: 10,
        backgroundColor: '#ccc',
        marginTop: 20,
        marginHorizontal: 20,
    },
    progressTime: {
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        top: 180,
        bottom: 0,

    },
    progressTimeText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Montserrat-Regular',
        zIndex: 5,

    },
    meditationProgramName: {
        position: 'absolute',
        bottom: 225,
        right: 0,
        left: 0,
        justifyContent: 'center',
        marginHorizontal: 20
    },
    meditationProgramNameText: {
        fontFamily: 'Montserrat-bold',
        color: '#fff',
        fontSize: 24,
    },
    timerSelectView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 55
    },
    optionBorder: {
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: '#fff',
    },
    option:{
        paddingHorizontal: 5

    },
    timeText: {
        fontFamily: 'Montserrat-regular',
        paddingHorizontal: 5,
        color: '#fff',
        fontSize: 16,

    },
    programTimerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 100,
        marginHorizontal: 20
    }

})

export default styles