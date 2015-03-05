/**
 * License TBC
 */
package org.apache.cordova.crypt;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.LOG;
import org.apache.cordova.PluginManager;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import android.util.Log;
import android.util.Base64;
import java.math.BigInteger;

import java.security.InvalidKeyException;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.security.spec.RSAPublicKeySpec;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

import java.nio.charset.Charset;

public class Crypt extends CordovaPlugin {

    /**
     * Executes the request and returns PluginResult.
     *
     * @param action            The action to execute.
     * @param args              JSONArry of arguments for the plugin.
     * @param callbackContext   The callback id used when calling back into JavaScript.
     * @return                  True if the action was valid, false if not.
     */
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("encrypt")) {
            try{
                String data = args.getString(0);
                String publickey = args.getString(1);
                callbackContext.success(this.encrypt(data, publickey));
            } catch(Exception e){
            }
        }
        else if(action.equals("decrypt")) {
            try{
                String data = args.getString(0);
                String privatekey = args.getString(1);
                callbackContext.success(this.decrypt(data, privatekey));
             } catch(Exception e){
             }
        } else {
            return false;
        }
        return true;
    }

    public String encrypt(String data, String publickey) throws Exception{
            publickey= publickey.replaceAll("(-+BEGIN PUBLIC KEY-+\\r?\\n|-+END PUBLIC KEY-+\\r?\\n?)", "");
    
            try{
                byte[] publickeyRaw = Base64.decode(publickey, Base64.DEFAULT);
                X509EncodedKeySpec keySpec = new X509EncodedKeySpec(publickeyRaw); 
                KeyFactory fact = KeyFactory.getInstance("RSA");
                PublicKey pub = fact.generatePublic(keySpec);

                byte[] text = data.getBytes(Charset.forName("UTF-8"));
            
                Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
                cipher.init(Cipher.ENCRYPT_MODE, pub);
                byte[] cipherString = cipher.doFinal(text);
               
                
                return new String(Base64.encode(cipherString, Base64.DEFAULT));

            } catch(Exception e){
                Log.w("Crypt", e);
                return null;
            }
    }

    public String decrypt(String data, String privatekey) throws IllegalBlockSizeException, BadPaddingException, InvalidKeyException, NoSuchAlgorithmException, NoSuchPaddingException {
        privatekey= privatekey.replaceAll("(-+BEGIN PRIVATE KEY-+\\r?\\n|-+END PRIVATE KEY-+\\r?\\n?)", "");  
        byte[] dataCipher = Base64.decode(data, Base64.DEFAULT);
       
        try{ 
            byte[] privatekeyRaw = Base64.decode(privatekey, Base64.DEFAULT);
            PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(privatekeyRaw);
            KeyFactory fact = KeyFactory.getInstance("RSA");
            PrivateKey priv = fact.generatePrivate(keySpec);

            Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
            cipher.init(Cipher.DECRYPT_MODE, priv);
            byte[] decrypted = cipher.doFinal(dataCipher);
            Log.w("CRYPT", new String(decrypted,"UTF-8"));

            return new String(decrypted,"UTF-8");

        } catch(Exception e){
            Log.w("CRYPT", e);
            return null;
        }
        
        
    }

}
